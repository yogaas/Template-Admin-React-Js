
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100">
        <div className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">General Configuration</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Organization Name</label>
              <input type="text" defaultValue="Nexus Admin Co." className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Contact Email</label>
              <input type="email" defaultValue="support@nexusadmin.com" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">Email Alerts</p>
                <p className="text-xs text-slate-500">Receive weekly performance summaries via email.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">Browser Push</p>
                <p className="text-xs text-slate-500">Real-time alerts for system critical events.</p>
              </div>
              <input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-end gap-3 bg-slate-50/50">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
