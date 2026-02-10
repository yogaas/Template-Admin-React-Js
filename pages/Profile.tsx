
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative h-48 bg-blue-600 rounded-t-3xl overflow-hidden">
        <img src="https://picsum.photos/id/10/1200/400" className="w-full h-full object-cover opacity-40" alt="Cover" />
      </div>
      
      <div className="px-8 pb-8">
        <div className="relative -mt-16 flex flex-col md:flex-row md:items-end gap-6 mb-8">
          <img 
            src="https://picsum.photos/id/1027/200/200" 
            alt="Profile" 
            className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900">Alex Rivera</h2>
            <p className="text-slate-500">Project Lead @ NexusAdmin Solutions</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              Edit Profile
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-md">
              Message
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">About Me</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Senior Product Manager with 10+ years of experience in leading multi-disciplinary teams through the full development lifecycle. Passionate about creating elegant, user-centric solutions that bridge the gap between business goals and technological capabilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Experience</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-600">NX</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Project Lead</h4>
                    <p className="text-xs text-slate-500">NexusAdmin • Jan 2022 - Present</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center font-bold text-indigo-600">ST</div>
                  <div>
                    <h4 className="font-bold text-slate-800">Senior Developer</h4>
                    <p className="text-xs text-slate-500">Stripe Logic • Jun 2018 - Dec 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Contact Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-800 font-medium">alex@nexus.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-slate-800 font-medium">+1 555-0123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-800 font-medium">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
