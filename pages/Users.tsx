
import React, { useState, useMemo } from 'react';
import { SAMPLE_USERS, Icons } from '../constants';
import { User } from '../types';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { Input, Select } from '../components/common/FormControls';
import Badge from '../components/common/Badge';
import { useToast } from '../contexts/ToastContext';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Global Toast Hook
  const { showToast } = useToast();

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (currentUser.id) {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? (currentUser as User) : u));
      showToast('User data updated successfully', 'info');
    } else {
      const newUser: User = {
        ...currentUser,
        id: Math.random().toString(36).substr(2, 9),
        avatar: `https://picsum.photos/seed/${Math.random()}/100/100`,
      } as User;
      setUsers(prev => [newUser, ...prev]);
      showToast('New user added successfully');
    }
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setUsers(prev => prev.filter(u => u.id !== deleteId));
      setDeleteId(null);
      showToast('User removed from system', 'error');
    }
  };

  return (
    <div className="space-y-8 pt-4 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Users</h1>
          <p className="text-slate-500 text-sm font-semibold mt-1">Manage platform access and permissions.</p>
        </div>
        <Button 
          icon={<Icons.Plus />} 
          size="lg"
          className="shadow-xl shadow-blue-500/20"
          onClick={() => { setCurrentUser({ name: '', email: '', role: 'User', status: 'Active' }); setIsFormOpen(true); }}
        >
          Add New User
        </Button>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-4 flex gap-4 shadow-xl shadow-slate-200/40">
        <Input 
          placeholder="Search by name or email address..." 
          icon={<Icons.Search />} 
          value={searchTerm}
          className="!bg-white border-transparent focus:ring-0 focus:border-transparent !shadow-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Profile</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Role</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} className="w-11 h-11 rounded-2xl border-2 border-white shadow-md transition-transform group-hover:scale-105" alt="" />
                      <div>
                        <p className="font-black text-slate-800 tracking-tight text-base leading-none">{user.name}</p>
                        <p className="text-xs text-slate-400 font-bold mt-2">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/50 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <Badge type={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'neutral'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <Button variant="ghost" size="sm" icon={<Icons.Eye />} className="!rounded-xl" onClick={() => { setCurrentUser(user); setIsFormOpen(true); }} />
                      <Button variant="ghost" size="sm" className="!rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50" icon={<Icons.Trash />} onClick={() => setDeleteId(user.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="text-slate-200 mb-4 flex justify-center scale-150"><Icons.Search /></div>
                      <p className="text-slate-400 font-bold tracking-tight">No users found matching your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        title={currentUser?.id ? 'Update User Access' : 'Register New User'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveUser} className="space-y-6">
          <Input 
            label="Full Name" 
            placeholder="e.g. Robert Fox"
            value={currentUser?.name} 
            onChange={e => setCurrentUser(p => ({...p!, name: e.target.value}))} 
            required
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="robert@example.com"
            value={currentUser?.email} 
            onChange={e => setCurrentUser(p => ({...p!, email: e.target.value}))} 
            required
          />
          <div className="grid grid-cols-2 gap-5">
            <Select label="User Role" value={currentUser?.role} onChange={e => setCurrentUser(p => ({...p!, role: e.target.value as any}))}>
              <option value="Admin">Administrator</option>
              <option value="Editor">Content Editor</option>
              <option value="User">Regular User</option>
            </Select>
            <Select label="Account Status" value={currentUser?.status} onChange={e => setCurrentUser(p => ({...p!, status: e.target.value as any}))}>
              <option value="Active">Active Account</option>
              <option value="Inactive">Deactivated</option>
              <option value="Pending">Approval Needed</option>
            </Select>
          </div>
          <div className="flex gap-4 pt-6 border-t border-slate-50">
            <Button 
              type="button"
              variant="secondary" 
              onClick={() => setIsFormOpen(false)} 
              className="flex-1"
            >
              Discard
            </Button>
            <Button 
              type="submit" 
              className="flex-1 shadow-xl shadow-blue-500/20"
              icon={<Icons.CheckCircle />}
            >
              Confirm Changes
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={confirmDelete} 
        title="Revoke Access?" 
        message="This will permanently delete the user account and revoke all associated access tokens and permissions." 
        confirmLabel="Confirm Delete"
      />
    </div>
  );
};

export default Users;
