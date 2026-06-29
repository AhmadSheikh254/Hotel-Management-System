import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const styles = {
  error: 'bg-red-50 text-red-800 border-red-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
};

const icons = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
};

export default function AlertMessage({ type = 'info', children, className = '' }) {
  const Icon = icons[type] || Info;
  return (
    <div
      className={`flex items-start gap-2 p-4 text-sm border rounded-sm ${styles[type]} ${className}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <Icon size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
