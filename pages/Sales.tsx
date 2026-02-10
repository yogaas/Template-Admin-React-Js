
import React, { useState, useMemo, useEffect } from 'react';
import { SAMPLE_SALES, SAMPLE_PRODUCTS, Icons } from '../constants';
import { Sale, SaleItem } from '../types';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Input } from '../components/common/FormControls';
import Badge from '../components/common/Badge';
import { useToast } from '../contexts/ToastContext';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(SAMPLE_SALES);
  const [isCreating, setIsCreating] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [lookupSearch, setLookupSearch] = useState('');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Tunai' | 'Transfer' | 'QRIS'>('Tunai');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { showToast } = useToast();

  const [newSale, setNewSale] = useState<Partial<Sale>>({
    code: `TRX/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customer: '',
    items: [],
    discount: 0,
    total: 0
  });

  const pricingData = useMemo(() => {
    const subtotal = newSale.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0;
    const discount = newSale.discount || 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.11);
    const total = taxable + tax;
    return { subtotal, discount, tax, total };
  }, [newSale.items, newSale.discount]);

  useEffect(() => setNewSale(prev => ({ ...prev, total: pricingData.total })), [pricingData.total]);

  const filteredProducts = useMemo(() => SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(lookupSearch.toLowerCase()) || p.id.toLowerCase().includes(lookupSearch.toLowerCase())), [lookupSearch]);

  const handleSelectItem = (prod: typeof SAMPLE_PRODUCTS[0]) => {
    const existing = newSale.items?.find(i => i.productId === prod.id);
    if (existing) {
      handleUpdateQty(existing.id, existing.qty + 1);
    } else {
      setNewSale(prev => ({ ...prev, items: [...(prev.items || []), { id: Math.random().toString(36).substr(2, 5), productId: prod.id, productName: prod.name, price: prod.price, qty: 1, subtotal: prod.price }] }));
    }
    setIsLookupOpen(false);
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    setNewSale(prev => ({ ...prev, items: prev.items?.map(item => item.id === id ? { ...item, qty: Math.max(1, newQty), subtotal: item.price * Math.max(1, newQty) } : item) }));
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === 'Tunai' && amountPaid < pricingData.total) return alert("Pembayaran kurang.");
    setShowSuccess(true);
    setTimeout(() => {
      setSales(prev => [{ ...newSale, id: Math.random().toString(36).substr(2, 9), status: 'Paid' } as Sale, ...prev]);
      setIsPaying(false); 
      setIsCreating(false); 
      setShowSuccess(false); 
      setAmountPaid(0);
      showToast(`Transaksi ${newSale.code} berhasil diselesaikan!`);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Penjualan (POS)</h1>
          <p className="text-slate-500 text-sm font-medium">Proses pesanan baru dengan cepat.</p>
        </div>
        {!isCreating && <Button onClick={() => setIsCreating(true)} icon={<Icons.Plus />}>Transaksi Baru</Button>}
      </div>

      {isCreating ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Kode Transaksi" readOnly value={newSale.code} className="bg-slate-50 font-mono text-xs" />
              <Input label="Nama Pelanggan" placeholder="Umum" value={newSale.customer} onChange={e => setNewSale(p => ({...p, customer: e.target.value}))} />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-700">Daftar Belanja</h3>
                <Button size="sm" variant="secondary" icon={<Icons.Search />} onClick={() => setIsLookupOpen(true)}>Cari Produk</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-5 py-3 font-bold">Produk</th>
                      <th className="px-5 py-3 font-bold">Harga</th>
                      <th className="px-5 py-3 font-bold text-center">Qty</th>
                      <th className="px-5 py-3 font-bold">Subtotal</th>
                      <th className="px-5 py-3 text-right">#</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {newSale.items?.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800">{item.productName}</td>
                        <td className="px-5 py-4 text-slate-600">Rp {item.price.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => handleUpdateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all">-</button>
                            <span className="font-bold w-6 text-center">{item.qty}</span>
                            <button onClick={() => handleUpdateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all">+</button>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-900">Rp {item.subtotal.toLocaleString()}</td>
                        <td className="px-5 py-4 text-right"><button onClick={() => setNewSale(p => ({...p, items: p.items?.filter(i => i.id !== item.id)}))} className="text-rose-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50"><Icons.Trash /></button></td>
                      </tr>
                    ))}
                    {(!newSale.items || newSale.items.length === 0) && (
                      <tr><td colSpan={5} className="text-center py-16 text-slate-400 italic font-medium">Belum ada barang yang ditambahkan.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-800 border-b pb-3">Ringkasan Pembayaran</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900">Rp {pricingData.subtotal.toLocaleString()}</span>
                </div>
                <Input label="Diskon" type="number" placeholder="0" value={newSale.discount || ''} onChange={e => setNewSale(p => ({...p, discount: parseInt(e.target.value) || 0}))} />
                <div className="flex justify-between text-sm font-medium border-t pt-3">
                  <span className="text-slate-500">PPN (11%)</span>
                  <span className="text-slate-900">Rp {pricingData.tax.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Total Akhir</span>
                  <span className="text-2xl font-black text-blue-600">Rp {pricingData.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Button className="w-full py-3" icon={<Icons.Wallet />} onClick={() => setIsPaying(true)} disabled={!newSale.items?.length}>Bayar Sekarang</Button>
                <Button className="w-full" variant="ghost" onClick={() => setIsCreating(false)}>Batalkan</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-bold">No. Invoice</th>
                  <th className="px-6 py-4 font-bold">Waktu</th>
                  <th className="px-6 py-4 font-bold">Pelanggan</th>
                  <th className="px-6 py-4 font-bold">Total</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                  <th className="px-6 py-4 text-right font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.map(sale => (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{sale.code}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">{sale.date} • {sale.time}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{sale.customer || 'Umum'}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Rp {sale.total.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center"><Badge type="success">{sale.status}</Badge></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" icon={<Icons.Eye />} />
                        <Button variant="ghost" size="sm" icon={<Icons.Printer />} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Lookup Modal */}
      <Modal isOpen={isLookupOpen} onClose={() => setIsLookupOpen(false)} title="Pilih Produk" maxWidth="max-w-lg">
        <Input placeholder="Ketik nama atau kode produk..." autoFocus value={lookupSearch} onChange={e => setLookupSearch(e.target.value)} icon={<Icons.Search />} />
        <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filteredProducts.map(prod => (
            <div 
              key={prod.id} 
              onClick={() => handleSelectItem(prod)} 
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-all group"
            >
              <div>
                <p className="font-bold text-slate-800 group-hover:text-blue-700">{prod.name}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{prod.id}</span>
                  <span className="text-[10px] font-bold text-blue-500">{prod.category}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">Rp {prod.price.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Stok: {prod.stock}</p>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-medium italic">Produk tidak ditemukan.</div>
          )}
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal isOpen={isPaying} onClose={() => !showSuccess && setIsPaying(false)} maxWidth="max-w-md" title="Selesaikan Pembayaran">
        {showSuccess ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
              <Icons.CheckCircle />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Pembayaran Berhasil!</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">Transaksi telah selesai diproses.</p>
            <Button variant="primary" className="mt-8 px-10" onClick={() => setShowSuccess(false)}>Selesai</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
              {['Tunai', 'Transfer', 'QRIS'].map(m => (
                <button 
                  key={m} 
                  onClick={() => setPaymentMethod(m as any)} 
                  className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${paymentMethod === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Tagihan</span>
                <span className="text-xl font-black text-slate-900">Rp {pricingData.total.toLocaleString()}</span>
              </div>
              
              {paymentMethod === 'Tunai' ? (
                <div className="space-y-4">
                  <Input label="Jumlah Uang Diterima" type="number" autoFocus value={amountPaid || ''} onChange={e => setAmountPaid(parseInt(e.target.value) || 0)} className="text-lg font-bold" />
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase">Kembalian</span>
                    <span className="text-lg font-black text-emerald-600">Rp {Math.max(0, amountPaid - pricingData.total).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                  <Icons.QrCode />
                  <p className="text-xs font-bold text-slate-500">Scan QR untuk melakukan pembayaran</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setIsPaying(false)}>Kembali</Button>
              <Button className="flex-1" onClick={handleConfirmPayment} disabled={paymentMethod === 'Tunai' && amountPaid < pricingData.total}>Konfirmasi</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Sales;
