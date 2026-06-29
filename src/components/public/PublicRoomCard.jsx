import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Maximize, Wifi, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function PublicRoomCard({ room, index = 0 }) {
  const reduced = useReducedMotion();
  const image = room.images?.[0] || room.image;
  const slug = room.slug || room.id;
  const roomName = room.name || room.type;

  return (
    <article
      className="luxury-card overflow-hidden group bg-white flex flex-col"
      style={{ animationDelay: reduced ? '0ms' : `${index * 80}ms` }}
    >
      <div className="h-56 md:h-64 overflow-hidden relative">
        <img
          src={image}
          alt={`${roomName} — ${room.category} at LuxuryStay Hospitality`}
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
          className="w-full h-full object-cover img-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
        <span className={`absolute top-4 left-4 text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-card ${
          room.status === 'Available' ? 'bg-white/95 text-green-800' : 'bg-gold/95 text-white'
        }`}>
          {room.status}
        </span>
        <span className="absolute bottom-4 right-4 text-white font-serif text-2xl" aria-label={`${room.price} dollars per night`}>
          ${room.price}<span className="text-xs font-sans opacity-75">/night</span>
        </span>
      </div>
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <p className="section-label !text-[9px] mb-2">{room.category}</p>
        <h3 className="text-xl font-serif text-luxury-black mb-2">{roomName}</h3>
        <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 line-clamp-2">{room.description}</p>
        <div className="flex flex-wrap gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-6">
          <span className="flex items-center gap-1.5"><Users size={12} className="text-gold" aria-hidden="true" /> {room.occupancy} Guests</span>
          <span className="flex items-center gap-1.5"><Maximize size={12} className="text-gold" aria-hidden="true" /> {room.size}</span>
          <span className="flex items-center gap-1.5"><Wifi size={12} className="text-gold" aria-hidden="true" /> WiFi</span>
        </div>
        <Link
          to={`/rooms/${slug}`}
          className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-card border border-gray-200 text-[10px] font-semibold uppercase tracking-widest text-luxury-black hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all duration-300 group/btn"
          aria-label={`View details for ${roomName}`}
        >
          View Details <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
