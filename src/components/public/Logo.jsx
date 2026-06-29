import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="LuxuryStay Hospitality — Home">
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-105 ${
          isLight
            ? 'border-white/30 bg-white/10 group-hover:border-gold/60 group-hover:bg-gold/10'
            : 'border-gold/30 bg-gold/5 group-hover:border-gold group-hover:shadow-gold-glow'
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
          <path
            d="M8 22V10l8-4 8 4v12l-8 4-8-4z"
            stroke="currentColor"
            strokeWidth="1.2"
            className={isLight ? 'text-white' : 'text-gold'}
          />
          <path
            d="M16 6v20M8 10l8 4 8-4M8 18l8 4 8-4"
            stroke="currentColor"
            strokeWidth="1.2"
            className={isLight ? 'text-white/70' : 'text-luxury-black/40'}
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-sans text-[15px] font-semibold tracking-[0.18em] ${isLight ? 'text-white' : 'text-luxury-black'}`}>
          LUXURY<span className="text-gold">STAY</span>
        </span>
        <span className={`mt-1 text-[8px] font-medium uppercase tracking-[0.45em] ${isLight ? 'text-white/50' : 'text-gray-400'}`}>
          Hospitality
        </span>
      </span>
    </Link>
  );
}
