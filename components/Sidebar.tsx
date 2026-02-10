
import React, { useState } from 'react';
import { Icons } from '../constants';
import { PageView } from '../types';

interface SidebarProps {
  isOpen: boolean;
  currentPage: PageView;
  onPageChange: (page: PageView) => void;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: { id: string, label: string }[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, onPageChange, onClose }) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'transactions': true
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sections: MenuSection[] = [
    {
      title: 'Main Menu',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
        { id: 'analytics', label: 'Analytics', icon: <Icons.Analytics /> },
      ]
    },
    {
      title: 'Master Data',
      items: [
        { id: 'users', label: 'Users & Customers', icon: <Icons.Users /> },
        { 
          id: 'transactions', 
          label: 'Sales & Invoices', 
          icon: <Icons.Transactions />,
          subItems: [
            { id: 'sales', label: 'All Orders' },
            { id: 'pending-payments', label: 'Pending Payments' },
            { id: 'refunds', label: 'Refund Requests' },
          ]
        },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile', icon: <Icons.Profile /> },
        { id: 'settings', label: 'Settings', icon: <Icons.Settings /> },
      ]
    }
  ];

  const handleNavClick = (id: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      toggleDropdown(id);
    } else {
      onPageChange(id as PageView);
      if (window.innerWidth < 1024) onClose();
    }
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-xl border-r border-slate-100 transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              N
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">NexusAdmin</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-8 custom-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                {section.title}
              </h4>
              
              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const isActive = currentPage === item.id;
                  const isDropdownOpen = openDropdowns[item.id];
                  const hasSubItems = !!item.subItems;

                  return (
                    <div key={item.id} className="space-y-1.5">
                      <button
                        onClick={() => handleNavClick(item.id, hasSubItems)}
                        className={`w-full group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>
                            {item.icon}
                          </span>
                          <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        {hasSubItems && (
                          <span className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                            <Icons.ChevronDown />
                          </span>
                        )}
                      </button>

                      {/* Dropdown content */}
                      {hasSubItems && isDropdownOpen && (
                        <div className="ml-6 border-l-2 border-slate-50 pl-5 py-2 space-y-1.5">
                          {item.subItems?.map((sub) => (
                            <button
                              key={sub.id}
                              className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold tracking-tight transition-all ${
                                currentPage === sub.id 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
                              }`}
                              onClick={() => {
                                onPageChange(sub.id as PageView);
                                if (window.innerWidth < 1024) onClose();
                              }}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card */}
        <div className="p-5 mt-auto">
          <div className="bg-slate-50 p-4 rounded-[2rem] flex items-center gap-4 border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="relative">
              <img 
                src="https://picsum.photos/id/1027/100/100" 
                alt="User" 
                className="w-10 h-10 rounded-2xl border-2 border-white shadow-md transition-transform group-hover:scale-110"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-800 truncate">Alex Rivera</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Project Lead</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
