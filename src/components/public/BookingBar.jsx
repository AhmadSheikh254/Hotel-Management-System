import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';
import { roomCategories } from '../../data/hotelData';
import { validateDateRange } from '../../utils/validation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function BookingBar({ compact = false }) {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState(roomCategories[0]?.id || '');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e) => {
    e?.preventDefault();
    const dateError = validateDateRange(checkIn, checkOut);
    if (dateError) {
      setError(dateError);
      return;
    }
    setError('');
    const params = new URLSearchParams();
    params.set('checkIn', checkIn);
    params.set('checkOut', checkOut);
    params.set('guests', guests);
    if (roomType) params.set('room', roomType);
    navigate(`/reservations?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`glass-panel ${compact ? 'p-2' : 'p-2 md:p-3'} flex flex-col lg:flex-row gap-0 shadow-2xl max-w-5xl mx-auto w-full ${reducedMotion ? '' : 'animate-fade-in-up'}`}
      noValidate
      aria-label="Check room availability"
    >
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        <label className="flex flex-col px-5 py-4 hover:bg-gold/5 transition-colors cursor-pointer group">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            <Calendar size={14} className="text-gold" aria-hidden="true" /> Check In
          </span>
          <input
            id="booking-check-in"
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => { setCheckIn(e.target.value); setError(''); }}
            className="bg-transparent border-none outline-none text-sm font-semibold text-luxury-black w-full"
            required
            aria-required="true"
          />
        </label>
        <label htmlFor="booking-check-out" className="flex flex-col px-5 py-4 hover:bg-gold/5 transition-colors cursor-pointer group">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            <Calendar size={14} className="text-gold" aria-hidden="true" /> Check Out
          </span>
          <input
            id="booking-check-out"
            type="date"
            value={checkOut}
            onChange={(e) => { setCheckOut(e.target.value); setError(''); }}
            min={checkIn || today}
            className="bg-transparent border-none outline-none text-sm font-semibold text-luxury-black w-full"
            required
            aria-required="true"
          />
        </label>
        <label htmlFor="booking-guests" className="flex flex-col px-5 py-4 hover:bg-gold/5 transition-colors cursor-pointer group">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            <Users size={14} className="text-gold" aria-hidden="true" /> Guests
          </span>
          <select
            id="booking-guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent border-none outline-none text-sm font-semibold text-luxury-black w-full cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
        <label htmlFor="booking-room-type" className="flex flex-col px-5 py-4 hover:bg-gold/5 transition-colors cursor-pointer group">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            <BedDouble size={14} className="text-gold" aria-hidden="true" /> Room Type
          </span>
          <select
            id="booking-room-type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-semibold text-luxury-black w-full cursor-pointer"
          >
            {roomCategories.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-col shrink-0">
        {error && (
          <p className="text-red-600 text-xs px-4 pt-2 text-center lg:text-left" role="alert">{error}</p>
        )}
        <button
          type="submit"
          className="bg-luxury-black text-white px-8 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Search size={16} aria-hidden="true" />
          Check Availability
        </button>
      </div>
    </form>
  );
}
