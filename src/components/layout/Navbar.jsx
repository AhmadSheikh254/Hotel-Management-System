import React, { useState } from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.header
      {...fadeInUp}
      className="h-20 bg-white/90 backdrop-blur-xl border-b border-gray-100/80 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm"
    >
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="flex items-center gap-4 bg-soft-beige/80 px-5 py-2.5 border border-gray-100 focus-within:border-gold/40 focus-within:shadow-md focus-within:shadow-gold/5 transition-all duration-300 w-full max-w-md"
      >
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search guests, rooms, invoices..."
          className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest w-full placeholder:text-gray-300"
        />
      </motion.div>

      <div className="flex items-center gap-6 md:gap-8">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-2.5 text-gray-400 hover:text-gold transition-colors relative group rounded-full hover:bg-gold/5"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-white animate-pulse" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 text-gray-400 hover:text-gold transition-colors rounded-full hover:bg-gold/5"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        <div className="h-8 w-px bg-gray-100 hidden sm:block" />

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-luxury-black group-hover:text-gold transition-colors duration-300">
              Alexander Vance
            </p>
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-0.5">
              General Manager
            </p>
          </div>
          <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-soft-beige group-hover:border-gold transition-all duration-500 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
              alt="Avatar"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
