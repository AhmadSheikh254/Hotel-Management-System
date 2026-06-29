import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, Maximize, BedDouble, Wifi, Check, ArrowLeft, Calendar } from 'lucide-react';
import { getRoomBySlug } from '../api/hotelApi';
import PageLoader from '../components/public/PageLoader';
import MotionSection from '../components/public/MotionSection';

export default function RoomDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRoomBySlug(slug)
      .then(setRoom)
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader message="Loading room details..." />;

  if (!room) {
    return (
      <div className="pt-28 pb-20 px-5 text-center">
        <h1 className="text-2xl font-serif mb-4">Room Not Found</h1>
        <p className="text-gray-500 mb-6">The room you are looking for may no longer be available.</p>
        <Link to="/rooms" className="text-gold text-sm uppercase tracking-widest font-bold">← Back to Rooms</Link>
      </div>
    );
  }

  const images = room.images || [room.image];

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gold mb-8 transition-colors focus-visible:outline-gold"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to Rooms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <MotionSection>
            <div className="h-72 md:h-96 overflow-hidden mb-3">
              <img
                src={images[activeImage]}
                alt={`${room.name} — photo ${activeImage + 1} of ${images.length}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="eager"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Room photos">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeImage === i}
                    aria-label={`View photo ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-24 overflow-hidden border-2 transition-all focus-visible:outline-gold ${activeImage === i ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </MotionSection>

          <MotionSection>
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]">{room.category}</span>
            <h1 className="text-3xl md:text-4xl font-serif text-luxury-black mt-2 mb-4">{room.name}</h1>
            <p className="text-gray-500 font-light leading-relaxed mb-6">{room.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: Users, label: 'Occupancy', value: `Up to ${room.occupancy}` },
                { icon: Maximize, label: 'Size', value: room.size },
                { icon: BedDouble, label: 'Bedding', value: room.beds },
                { icon: Wifi, label: 'Status', value: room.status },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-gray-100 p-4">
                  <Icon size={16} className="text-gold mb-2" aria-hidden="true" />
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{label}</p>
                  <p className="text-sm font-semibold text-luxury-black mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <p className="text-3xl font-serif text-gold mb-6">
              ${room.price}<span className="text-sm text-gray-400 font-sans"> / night</span>
            </p>

            <button
              type="button"
              onClick={() => navigate(`/reservations?room=${room.slug}`)}
              className="btn-gold w-full !py-4 flex items-center justify-center gap-2"
            >
              <Calendar size={16} aria-hidden="true" /> Reserve This Room
            </button>
          </MotionSection>
        </div>

        <MotionSection className="luxury-card p-8">
          <h2 className="font-serif text-2xl mb-6">Room Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(room.amenities || []).map((a) => (
              <div key={a} className="flex items-center gap-3 text-sm text-gray-600">
                <Check size={14} className="text-gold shrink-0" aria-hidden="true" />
                {a}
              </div>
            ))}
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
