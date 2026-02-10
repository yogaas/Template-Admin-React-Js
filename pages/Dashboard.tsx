
import React, { useState } from 'react';
import { Icons, SAMPLE_TRANSACTIONS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateDashboardInsights } from '../geminiService';

const DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const stats = [
    { label: 'Total Revenue', value: '$128,430', change: 12.5, icon: <Icons.Dashboard /> },
    { label: 'Total Users', value: '45,201', change: -2.4, icon: <Icons.Users /> },
    { label: 'Avg. Order', value: '$84.50', change: 8.2, icon: <Icons.Analytics /> },
    { label: 'Conversion Rate', value: '3.4%', change: 0.8, icon: <Icons.Settings /> },
  ];

  const handleGenerateInsight = async () => {
    setLoadingInsight(true);
    const insight = await generateDashboardInsights(stats, SAMPLE_TRANSACTIONS);
    setAiInsight(insight || "No insight available.");
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">Monitor real-time business performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerateInsight}
            disabled={loadingInsight}
            className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:shadow-lg transition-all shadow-sm disabled:opacity-50 active:scale-95"
          >
            <div className="text-blue-500"><Icons.Sparkles /></div>
            {loadingInsight ? 'Analysing...' : 'AI Insights'}
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-95">
            Export Data
          </button>
        </div>
      </div>

      {aiInsight && (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-500/20 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="flex items-center gap-3 font-black text-xl mb-4 relative z-10">
            <Icons.Sparkles />
            <h3>Smart Business Analysis</h3>
          </div>
          <div className="text-blue-50 text-base leading-relaxed whitespace-pre-wrap font-medium relative z-10 max-w-4xl">
            {aiInsight}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl text-slate-500 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {stat.icon}
              </div>
              <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${
                stat.change > 0 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight group-hover:text-blue-600 transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-slate-800 text-lg">Revenue Projection</h3>
            <select className="text-xs font-bold bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all cursor-pointer">
              <option>Past 30 Days</option>
              <option>Past 90 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} dx={-10} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '1.5rem', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 text-lg">Recent Activities</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-5 flex-1">
            {SAMPLE_TRANSACTIONS.slice(0, 5).map((trx) => (
              <div key={trx.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {trx.customer[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 leading-tight tracking-tight">{trx.customer}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{trx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">${trx.amount.toLocaleString()}</p>
                  <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                    trx.status === 'Completed' ? 'text-emerald-500' : 
                    trx.status === 'Processing' ? 'text-amber-500' : 'text-rose-500'
                  }`}>{trx.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
