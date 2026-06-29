import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const events = [
  { room: '402', guest: 'Julian B.', days: [1, 2, 3], status: 'confirmed' },
  { room: '405', guest: 'Sarah M.', days: [2, 3, 4, 5], status: 'checked-in' },
  { room: 'Royal 01', guest: 'Michael K.', days: [8, 9, 10], status: 'pending' },
  { room: 'Garden 22', guest: 'Elena R.', days: [5, 6, 7], status: 'confirmed' },
  { room: 'Pent 01', guest: 'Robert D.', days: [12, 13, 14, 15], status: 'confirmed' },
  { room: 'Exec 12', guest: 'Alice T.', days: [18, 19], status: 'pending' },
];

const calendarRooms = ['402', '405', 'Royal 01', 'Garden 22', 'Pent 01', 'Exec 12'];
const days = Array.from({ length: 30 }, (_, i) => i + 1);

const eventStyles = {
  'checked-in': 'bg-gold text-white shadow-gold-glow',
  confirmed: 'bg-luxury-black text-gold',
  pending: 'bg-soft-beige text-gray-500 border border-gray-100',
};

const Reservations = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Reservation Calendar</h2>
          <p className="page-subtitle">Global booking schedule</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 p-1 flex items-center gap-2 shadow-sm">
            <motion.button whileHover={{ scale: 1.1 }} type="button" className="p-2 text-gray-400 hover:text-gold transition-colors">
              <ChevronLeft size={16} />
            </motion.button>
            <span className="text-[10px] font-bold w-36 text-center uppercase tracking-[0.3em]">June 2026</span>
            <motion.button whileHover={{ scale: 1.1 }} type="button" className="p-2 text-gray-400 hover:text-gold transition-colors">
              <ChevronRight size={16} />
            </motion.button>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} className="btn-gold flex items-center gap-2">
            <Plus size={16} /> New Booking
          </motion.button>
        </div>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="flex border-b border-gray-50 bg-soft-beige/40">
              <div className="w-48 p-5 border-r border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Room / Date
              </div>
              <div className="flex-1 flex">
                {days.map((day) => (
                  <div key={day} className="flex-1 p-4 text-center border-r border-gray-50/40 text-[9px] font-bold text-gray-300">
                    {String(day).padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="divide-y divide-gray-50">
              {calendarRooms.map((room) => (
                <motion.div key={room} variants={staggerItem} className="flex group h-16 hover:bg-soft-beige/20 transition-colors duration-300">
                  <div className="w-48 p-5 border-r border-gray-50 bg-white group-hover:bg-soft-beige/30 transition-colors">
                    <p className="text-sm font-bold text-luxury-black font-serif">Suite {room}</p>
                  </div>
                  <div className="flex-1 flex relative">
                    {days.map((day) => (
                      <div key={day} className="flex-1 border-r border-gray-50/20" />
                    ))}
                    {events.filter((e) => e.room === room).map((event, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, zIndex: 20 }}
                        className={`absolute top-3 bottom-3 rounded-sm truncate px-3 cursor-pointer transition-all z-10 flex items-center gap-2 ${eventStyles[event.status]}`}
                        style={{
                          left: `${(event.days[0] - 1) * (100 / 30)}%`,
                          width: `${event.days.length * (100 / 30)}%`,
                        }}
                      >
                        <User size={10} />
                        <span className="text-[8px] font-bold uppercase tracking-widest truncate">{event.guest}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.15 }} className="md:col-span-2 luxury-card p-8">
          <div className="flex justify-between items-center mb-8 pb-5 border-b border-gray-50">
            <h3 className="font-serif text-2xl">Today&apos;s Check-ins</h3>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Expected: 12</span>
          </div>
          <div className="space-y-4">
            {['Alice Thompson', 'Robert Davis', 'Sarah Miller'].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-5 bg-white border border-gray-50 group hover:border-gold/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex gap-5 items-center">
                  <div className="h-11 w-11 bg-soft-beige border border-gold/10 flex items-center justify-center text-gold font-serif text-lg font-bold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    {name[0]}
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-luxury-black">{name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Ref #LX-2094{i} • Suite 402</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-2.5 bg-luxury-black text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300">
                  Check In
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="luxury-card p-8 bg-luxury-black text-white flex flex-col">
          <h3 className="font-serif text-2xl mb-2">Quick Booking</h3>
          <p className="text-gray-500 text-xs tracking-widest uppercase mb-8">Direct reservation desk</p>
          <div className="space-y-6 flex-1">
            <div className="border-b border-white/10 pb-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Room Type</label>
              <select className="bg-transparent border-none outline-none w-full text-xs tracking-widest text-gray-400 appearance-none cursor-pointer">
                <option className="bg-luxury-black">Deluxe Suite</option>
                <option className="bg-luxury-black">Royal Garden View</option>
                <option className="bg-luxury-black">Presidential Wing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-b border-white/10 pb-4">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Check In</label>
                <input type="date" className="bg-transparent border-none outline-none w-full text-[10px] text-gray-400" />
              </div>
              <div className="border-b border-white/10 pb-4">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Check Out</label>
                <input type="date" className="bg-transparent border-none outline-none w-full text-[10px] text-gray-400" />
              </div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-gold !py-4 mt-8 shadow-gold-glow">
            Confirm Booking
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservations;
