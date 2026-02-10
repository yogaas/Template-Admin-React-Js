
import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { Icons } from '../../constants';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'primary' | 'success';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, confirmLabel = 'Konfirmasi', variant = 'danger' 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center">
        <div className={`w-16 h-16 ${variant === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {variant === 'danger' ? <Icons.Trash /> : <Icons.CheckCircle />}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
          {message}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">Batal</Button>
          <Button variant={variant} onClick={onConfirm} className="flex-1">{confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
