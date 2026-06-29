import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Waves, Dumbbell, UtensilsCrossed, Wifi, Car, ArrowRight, Star, Award, Clock, Users } from 'lucide-react';
import BookingBar from '../components/public/BookingBar';
import PublicRoomCard from '../components/public/PublicRoomCard';
import TestimonialCard from '../components/public/TestimonialCard';
import MotionSection from '../components/public/MotionSection';
import SectionHeader from '../components/public/SectionHeader';
import { roomCategories, amenities, testimonials } from '../data/hotelData';
import { useReducedMotion } from '../hooks/useReducedMotion';

const amenityIcons = {
  spa: Sparkles,
  pool: Waves,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  'room-service': UtensilsCrossed,
  transfer: Car,
  wifi: Wifi,
};

const stats = [
  { v: '4.9', l: 'Guest Rating', icon: Star },
  { v: '150+', l: 'Luxury Suites', icon: Award },
  { v: '24/7', l: 'Concierge', icon: Clock },
  { v: '12K+', l: 'Happy Guests', icon: Users },
];

export default function Home() {
  const reducedMotion = useReducedMotion();
  const featuredRooms = roomCategories.slice(0, 3);
  const HeroWrap = reducedMotion ? 'div' : motion.div;

  return (
    <>
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000"
            alt="LuxuryStay Hospitality resort overlooking the Amalfi Coast"
            className="w-full h-full object-cover scale-105 img-hover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        <div className="relative z-10 text-center text-white px-5 max-w-5xl mx-auto pt-32 pb-36 md:pt-36">
          <HeroWrap
            {...(!reducedMotion && { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              Five-Star Hospitality
            </span>
          </HeroWrap>

          <HeroWrap
            {...(!reducedMotion && { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.7 } })}
          >
            <h1 className="page-hero-title mb-6">
              Experience <span className="italic font-normal text-gold-light">Luxury</span> Redefined
            </h1>
          </HeroWrap>

          <HeroWrap
            {...(!reducedMotion && { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.25 } })}
          >
            <p className="text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              A sanctuary of elegance on the Amalfi Coast — where world-class hospitality meets timeless sophistication.
            </p>
          </HeroWrap>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/reservations" className="btn-gold !px-10 !py-4 group">
              Reserve Your Stay
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link to="/rooms" className="btn-outline !border-white/50 !text-white hover:!bg-white hover:!text-luxury-black !px-10 !py-4">
              Explore Rooms
            </Link>
          </div>

          <BookingBar />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40" aria-hidden="true">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      <section className="section-padding" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <MotionSection>
            <span className="section-label">About LuxuryStay</span>
            <h2 className="section-title mt-4 mb-6">
              A Commitment to <span className="italic">Exceptional</span> Hospitality
            </h2>
            <p className="section-desc mb-6 !max-w-none">
              At LuxuryStay Hospitality, every detail is curated to exceed expectations. From hand-selected Italian marble
              and bespoke furnishings to our award-winning culinary team, we deliver an experience that defines five-star luxury.
            </p>
            <p className="text-gray-500 leading-relaxed font-light mb-10">
              Our dedicated concierge, wellness specialists, and hospitality experts ensure personalized
              attention from arrival until departure.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.l} className="stat-card !p-5">
                    <Icon size={18} className="text-gold mx-auto mb-2" aria-hidden="true" />
                    <p className="text-2xl md:text-3xl font-serif text-gold">{s.v}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">{s.l}</p>
                  </div>
                );
              })}
            </div>
          </MotionSection>

          <MotionSection delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-card">
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" alt="Luxury suite interior with ocean view" className="w-full h-72 object-cover img-hover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-card mt-10">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" alt="Grand hotel lobby with marble finishes" className="w-full h-72 object-cover img-hover" loading="lazy" />
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Accommodations"
            title="Featured Rooms & Suites"
            description="Meticulously designed accommodations offering refined comfort and breathtaking coastal views."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <PublicRoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/rooms" className="link-arrow">
              View All Rooms <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-luxury-black text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Amenities"
            title="World-Class Services"
            description="Indulge in exceptional facilities crafted for the discerning traveler."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {amenities.map((a, i) => {
              const Icon = amenityIcons[a.id] || Sparkles;
              return (
                <MotionSection key={a.id} delay={i * 0.05} className="amenity-card group">
                  <div className="h-11 w-11 flex items-center justify-center rounded-card border border-gold/25 text-gold mb-5 transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg mb-2">{a.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{a.description}</p>
                </MotionSection>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link to="/services" className="btn-outline !border-gold/60 !text-gold hover:!bg-gold hover:!text-white">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Testimonials"
            title="Guest Reviews"
            description="Hear from travelers who have experienced the LuxuryStay difference."
          />
          <div className="flex justify-center gap-1 mb-10 text-gold" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/feedback" className="link-arrow text-gray-400 hover:text-gold">
              Share Your Experience <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative section-padding overflow-hidden">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000" alt="Sunset view from luxury hotel terrace" className="absolute inset-0 w-full h-full object-cover brightness-[0.35]" loading="lazy" />
        <div className="absolute inset-0 bg-luxury-black/55" />
        <MotionSection className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <span className="section-label text-gold-light">Begin Your Journey</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-6">Your Extraordinary Stay Awaits</h2>
          <p className="text-white/65 font-light mb-10 leading-relaxed text-lg">
            Reserve your suite and discover why discerning travelers choose us as their coastal sanctuary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/reservations" className="btn-gold !px-10 !py-4">Make a Reservation</Link>
            <Link to="/contact" className="btn-outline !border-white/50 !text-white hover:!bg-white hover:!text-luxury-black !px-10 !py-4">
              Contact Concierge
            </Link>
          </div>
        </MotionSection>
      </section>
    </>
  );
}
