import React from 'react';

export default function LoadingSpinner({ size = 18, className = '' }) {
  return (
    <span
      className={`inline-block border-2 border-current/30 border-t-current rounded-full animate-spin ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-hidden="true"
    />
  );
}
