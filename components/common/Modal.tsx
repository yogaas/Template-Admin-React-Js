
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div className={`relative bg-white w-full ${maxWidth} rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 fade-in duration-300 ease-out`}>
        {title && (
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-50 transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        )}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
