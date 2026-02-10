
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const Badge: React.FC<BadgeProps> = ({ children, type = 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    danger: 'bg-rose-50 text-rose-600 border-rose-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${styles[type]}`}>
      {children}
    </span>
  );
};

export default Badge;
