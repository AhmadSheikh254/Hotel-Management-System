import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { brand } from '../data/hotelData';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/public/Logo';
import PageTransition from '../components/public/PageTransition';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/rooms', label: 'Rooms' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/services', label: 'Services' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/contact', label: 'Contact' },
];

function NavItem({ link, light }) {
  return (
    <NavLink
      to={link.to}
      end={link.end}
      className={({ isActive }) =>
        `nav-link ${light ? 'nav-link-light' : 'nav-link-dark'}${isActive ? ' nav-link-active' : ''}`
      }
    >
      {link.label}
    </NavLink>
  );
}

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const navLight = isHome && !scrolled && !mobileOpen;

  const headerClass = scrolled || !isHome
    ? 'nav-glass-scrolled py-3'
    : isHome
      ? 'nav-glass-dark py-5'
      : 'nav-glass py-4';

  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-6 h-14 md:h-16">
            <Logo variant={navLight ? 'light' : 'dark'} />

            <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavItem key={link.to} link={link} light={navLight} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {user ? (
                <>
                  <Link
                    to="/account"
                    className={`btn-ghost ${navLight ? '!text-white/90 hover:!text-gold' : ''}`}
                  >
                    My Account
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className={`btn-ghost ${navLight ? 'text-white/50 hover:!text-red-300' : 'text-gray-400 hover:!text-red-500'}`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`btn-ghost ${navLight ? '!text-white/90 hover:!text-white' : ''}`}
                  >
                    Login
                  </Link>
                  <Link to="/register" className="btn-gold !px-5 !py-2.5 !text-[10px]">
                    Register
                  </Link>
                </>
              )}
              <Link
                to="/reservations"
                className={`btn-nav-cta ${
                  navLight
                    ? 'border-white/40 text-white hover:bg-white hover:text-luxury-black hover:border-white'
                    : 'border-gold/60 text-gold hover:bg-gold hover:text-white hover:border-gold'
                }`}
              >
                Book Now
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-card transition-colors ${navLight ? 'text-white hover:bg-white/10' : 'text-luxury-black hover:bg-gray-100'}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-0 top-[57px] md:top-[65px] z-40 bg-white/98 backdrop-blur-2xl overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <nav className="flex flex-col p-6 gap-1 max-w-lg mx-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `block px-4 py-4 text-sm font-medium uppercase tracking-[0.12em] rounded-card transition-colors ${
                          isActive ? 'text-gold bg-gold/8' : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <hr className="my-4 border-gray-100" />
                {user ? (
                  <>
                    <Link to="/account" className="px-4 py-4 text-sm font-medium uppercase tracking-widest text-luxury-black hover:bg-gray-50 rounded-card">My Account</Link>
                    <button type="button" onClick={logout} className="px-4 py-4 text-sm font-medium uppercase tracking-widest text-red-500 text-left hover:bg-red-50 rounded-card">Logout</button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 px-4">
                    <Link to="/login" className="btn-outline text-center !py-3">Login</Link>
                    <Link to="/register" className="btn-gold text-center !py-3">Register</Link>
                  </div>
                )}
                <Link to="/reservations" className="btn-gold text-center mt-4 !py-4">Book Your Stay</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <footer className="bg-luxury-black text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-16 md:pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">
            <div className="lg:col-span-4">
              <Logo variant="light" className="mb-6" />
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                {brand.fullName} — where timeless elegance meets exceptional service on the Amalfi Coast.
              </p>
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold hover:text-gold-light transition-colors group"
              >
                Reserve Your Stay
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-5">Explore</h4>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-5">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-gold" />
                  </span>
                  {brand.phone}
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-gold" />
                  </span>
                  {brand.email}
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-gold" />
                  </span>
                  <span className="leading-relaxed">{brand.address}</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-5">Staff Portal</h4>
              <p className="text-sm text-gray-400 font-light mb-5 leading-relaxed">
                Authorized personnel access for hotel management.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] border border-white/15 px-5 py-3 rounded-card hover:border-gold hover:text-gold transition-all duration-300"
              >
                Manager Login
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500">
              <Link to="/privacy" className="hover:text-gold transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors duration-300">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
