
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'User';
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  qty: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  code: string;
  date: string;
  time: string;
  customer: string;
  items: SaleItem[];
  discount: number;
  total: number;
  status: 'Paid' | 'Unpaid';
}

export interface StatItem {
  label: string;
  value: string | number;
  change: number;
  icon: string;
}

export type PageView = 'dashboard' | 'users' | 'analytics' | 'settings' | 'profile' | 'sales';
