import React from 'react';

export default function PageLoader({ message = 'Loading...' }) {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center gap-5 pt-28 pb-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gold/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
      </div>
      <p className="text-sm text-gray-500 tracking-wide font-medium">{message}</p>
    </div>
  );
}
