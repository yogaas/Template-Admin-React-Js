
import React from 'react';
import { Icons } from '../constants';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="px-4 md:px-8 pt-4 md:pt-6 sticky top-0 z-20">
      <div className="h-16 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-3xl flex items-center justify-between px-4 md:px-6 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all text-slate-500 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>

          <div className="hidden md:flex items-center bg-slate-50/80 px-4 py-2 rounded-2xl w-64 lg:w-96 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 border border-transparent focus-within:border-blue-100 transition-all group">
            <div className="text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Icons.Search />
            </div>
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none ml-3 text-sm font-medium w-full text-slate-700"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-2xl relative transition-all active:scale-90">
            <Icons.Notification />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>
          <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">Alex Rivera</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Premium Plan</p>
            </div>
            <img 
              src="https://picsum.photos/id/1027/100/100" 
              alt="User" 
              className="w-10 h-10 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-blue-200 ring-2 ring-white border border-slate-100 transition-all group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
