import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  CalendarCheck,
  ReceiptJapaneseYen,
  Waves,
  BarChart3,
  ConciergeBell,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft } from '../../utils/animations';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Guest Management', icon: Users, path: '/admin/guests' },
  { name: 'Room Inventory', icon: BedDouble, path: '/admin/rooms' },
  { name: 'Reservations', icon: CalendarCheck, path: '/admin/reservations' },
  { name: 'Billing & Invoices', icon: ReceiptJapaneseYen, path: '/admin/billing' },
  { name: 'Housekeeping', icon: Waves, path: '/admin/housekeeping' },
  { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { name: 'Guest Services', icon: ConciergeBell, path: '/admin/services' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <motion.aside
      {...slideInLeft}
      className="w-72 h-screen bg-luxury-black text-white flex flex-col border-r border-gold/20 sticky top-0 overflow-y-auto shrink-0"
    >
      <div className="p-8 pb-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-left group"
        >
          <h1 className="text-2xl font-bold tracking-[0.35em] text-white group-hover:text-gold transition-colors duration-300">
            LUXURY<span className="text-gold">STAY</span>
          </h1>
          <p className="text-[8px] text-gray-500 tracking-[0.5em] font-bold mt-3 uppercase">
            Hospitality Excellence
          </p>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
            >
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <div
                    className={`relative flex items-center justify-between px-5 py-3.5 transition-all duration-300 group border-l-2 ${
                      isActive
                        ? 'bg-white/8 text-gold border-gold shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]'
                        : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5 hover:border-gold/30'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-gold/5 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight
                      size={12}
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-gold'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-5 border-t border-white/10 mt-4">
        <button
          type="button"
          onClick={() => navigate('/admin/login')}
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-all duration-300 w-full px-4 py-3 rounded-sm hover:bg-white/5 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-semibold uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
