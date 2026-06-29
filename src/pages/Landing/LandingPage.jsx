import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Tv,
  Coffee,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const showcaseImages = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
];

const instagramImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=500',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=500',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=500',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=500',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=500',
];

const amenities = [
  { label: 'Suites & Rooms', icon: Wifi },
  { label: 'Spa & Wellness', icon: Tv },
  { label: 'Fine Dining', icon: Coffee },
];

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-soft-beige selection:bg-gold selection:text-white overflow-x-hidden">
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-luxury py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.35em]">
            <span className={isScrolled ? 'text-luxury-black' : 'text-white'}>LUXURY</span>
            <span className="text-gold">STAY</span>
          </Link>

          <div className={`hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em] ${
            isScrolled ? 'text-luxury-black' : 'text-white'
          }`}>
            {['About', 'Rooms', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className={`text-[10px] font-bold uppercase tracking-widest hover:text-gold transition-colors duration-300 ${
                isScrolled ? 'text-luxury-black' : 'text-white'
              }`}
            >
              Manager Login
            </Link>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-gold hidden sm:block !px-6 !py-2.5">
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury hotel hero"
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gold text-spacing-wide uppercase text-xs font-bold mb-5"
          >
            Welcome to Paradise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-[1.1]"
          >
            Roxandrea <br />
            <span className="italic font-normal">Atmosphere</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/70 text-sm md:text-base tracking-wide max-w-xl mx-auto mb-10"
          >
            Where timeless elegance meets modern hospitality on the Amalfi Coast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-4xl mx-auto glass-panel p-2 flex flex-col md:flex-row shadow-2xl"
          >
            {[
              { label: 'Check In', value: 'Select Date', icon: Calendar },
              { label: 'Check Out', value: 'Select Date', icon: Calendar },
              { label: 'Guests', value: '2 Adults', icon: Users },
              { label: 'Room', value: 'Deluxe Suite', icon: Star },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.06)' }}
                  type="button"
                  className="flex-1 flex flex-col items-start px-6 py-4 text-luxury-black border-b md:border-b-0 md:border-r border-gray-100 last:border-0 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}</span>
                </motion.button>
              );
            })}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#D4AF37' }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="bg-luxury-black text-white px-8 py-5 font-bold uppercase tracking-[0.25em] text-xs transition-colors duration-500"
            >
              Check Availability
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
          <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
        </motion.div>
      </section>

      <section className="py-16 px-6 md:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {showcaseImages.map((src, i) => (
            <motion.div
              key={src}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className={`overflow-hidden group relative ${i === 0 ? 'md:col-span-2 md:row-span-1 h-72 md:h-80' : 'h-48 md:h-64'}`}
            >
              <img src={src} alt={`Showcase ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-white/60 px-4 py-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  Explore
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 text-center max-w-4xl mx-auto" id="about">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold text-spacing-wide uppercase text-xs font-bold mb-4 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Elevating Hospitality to a <span className="italic">Fine Art</span>
          </h2>
          <p className="text-gray-500 leading-relaxed font-light text-base md:text-lg">
            Located on the Amalfi Coast, Roxandrea Hotel offers an unparalleled experience of elegance.
            From hand-selected marble to world-renowned dining, every detail is crafted for the discerning traveler.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          id="services"
        >
          {amenities.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} variants={staggerItem} whileHover={{ y: -6 }} className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="h-20 w-20 flex items-center justify-center border border-gold/20 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500 rounded-full text-gold">
                  <Icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-gold transition-colors">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 bg-white border-y border-gray-100 relative overflow-hidden" id="rooms">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-gold text-spacing-wide uppercase text-xs font-bold mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-10">What Our Guests Say</h2>
          <div className="flex justify-center gap-1 mb-8 text-gold">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <Star size={18} fill="currentColor" />
              </motion.div>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-luxury-black mb-8 leading-relaxed">
            &ldquo;An extraordinary stay. The attention to detail is remarkable, and the atmosphere at Roxandrea is simply magical.&rdquo;
          </p>
          <span className="text-sm font-bold uppercase tracking-widest">James Alexander Sterling</span>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Connoisseur Traveller</p>
        </motion.div>
      </section>

      <section className="py-16 md:py-20 bg-luxury-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-gold text-spacing-wide uppercase text-[10px] font-bold mb-3 block">Follow Us</span>
            <h3 className="text-3xl md:text-4xl font-serif">@LuxuryStay_Hotels</h3>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3"
          >
            {instagramImages.map((src, i) => (
              <motion.div key={src} variants={staggerItem} whileHover={{ scale: 1.03 }} className="aspect-square overflow-hidden group cursor-pointer">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="bg-luxury-black text-white pt-20 pb-10 px-6 md:px-10 border-t border-white/5" id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-[0.35em] inline-block hover:opacity-80 transition-opacity">
              LUXURY<span className="text-gold">STAY</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              The pinnacle of luxury hospitality. Experience elegance in every corner of the world.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, borderColor: '#D4AF37', color: '#D4AF37' }}
                  className="h-10 w-10 border border-white/10 flex items-center justify-center rounded-full transition-colors duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-[10px] mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              {['Guest Portal', 'Suites & Villas', 'Spa & Wellness', 'Our Story'].map((link) => (
                <li key={link}><a href="#" className="hover:text-gold transition-colors duration-300">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-[10px] mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li className="flex items-center gap-3"><Phone size={14} className="text-gold shrink-0" /> +1 (800) LUX-STAY</li>
              <li className="flex items-center gap-3"><Mail size={14} className="text-gold shrink-0" /> booking@luxurystay.com</li>
              <li className="flex items-center gap-3"><MapPin size={14} className="text-gold shrink-0" /> Amalfi Coast, Italy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-[10px] mb-6">Newsletter</h4>
            <p className="text-gray-400 text-xs mb-4">Exclusive offers and updates.</p>
            <div className="flex bg-white/5 border border-white/10 overflow-hidden focus-within:border-gold/40 transition-colors duration-300">
              <input type="email" placeholder="Your email" className="bg-transparent border-none px-4 py-3 text-xs w-full outline-none" />
              <motion.button whileHover={{ scale: 1.05 }} type="button" className="bg-gold px-4 text-luxury-black hover:bg-gold-dark transition-colors">
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-[8px] font-bold uppercase tracking-[0.35em]">
          <p>© 2026 LuxuryStay Hospitality. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
