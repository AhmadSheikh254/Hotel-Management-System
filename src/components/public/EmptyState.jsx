import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state" role="status">
      {Icon && (
        <div className="empty-state-icon" aria-hidden="true">
          <Icon size={28} className="text-gold" />
        </div>
      )}
      <h3 className="font-serif text-xl text-luxury-black mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-gold !px-6 !py-3">{actionLabel}</Link>
      )}
    </div>
  );
}
