import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Wifi, Tv, Coffee } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const rooms = [
  { id: '101', type: 'Deluxe Suite', price: 450, status: 'Available', floor: '1', amenities: ['wifi', 'tv', 'coffee'] },
  { id: '102', type: 'Deluxe Suite', price: 450, status: 'Occupied', floor: '1', amenities: ['wifi', 'tv'] },
  { id: '103', type: 'Garden View', price: 320, status: 'Cleaning', floor: '1', amenities: ['wifi', 'coffee'] },
  { id: '201', type: 'Penthouse', price: 1200, status: 'Available', floor: '2', amenities: ['wifi', 'tv', 'coffee'] },
  { id: '202', type: 'Executive Room', price: 550, status: 'Maintenance', floor: '2', amenities: ['wifi', 'tv'] },
  { id: '203', type: 'Executive Room', price: 550, status: 'Available', floor: '2', amenities: ['wifi', 'tv', 'coffee'] },
  { id: '301', type: 'Royal Suite', price: 2500, status: 'Occupied', floor: '3', amenities: ['all'] },
  { id: '302', type: 'Grand Suite', price: 850, status: 'Available', floor: '3', amenities: ['wifi', 'tv', 'coffee'] },
];

const statusStyles = {
  Available: 'bg-green-50 text-green-700 border-green-100',
  Occupied: 'bg-red-50 text-red-600 border-red-100',
  Cleaning: 'bg-blue-50 text-blue-600 border-blue-100',
  Maintenance: 'bg-orange-50 text-orange-600 border-orange-100',
};

const StatusBadge = ({ status }) => (
  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-sm border ${statusStyles[status]}`}>
    {status}
  </span>
);

const RoomCard = ({ room }) => (
  <motion.div
    layout
    variants={staggerItem}
    whileHover={{ y: -6 }}
    className="luxury-card overflow-hidden group flex flex-col bg-white"
  >
    <div className="h-56 overflow-hidden relative">
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
        alt={room.type}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      <div className="absolute top-5 left-5">
        <StatusBadge status={room.status} />
      </div>
    </div>
    <div className="p-7 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Unit {room.id}</p>
          <h4 className="text-xl font-serif text-luxury-black mt-1">{room.type}</h4>
        </div>
        <p className="text-lg font-serif text-gold">
          ${room.price}
          <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest ml-1">/ night</span>
        </p>
      </div>
      <div className="flex gap-5 text-gray-300 mb-6 items-center border-t border-gray-50 pt-5">
        <div className="flex items-center gap-2"><Wifi size={14} /><span className="text-[9px] font-bold uppercase tracking-widest">WiFi</span></div>
        <div className="flex items-center gap-2"><Tv size={14} /><span className="text-[9px] font-bold uppercase tracking-widest">TV</span></div>
        <div className="flex items-center gap-2"><Coffee size={14} /><span className="text-[9px] font-bold uppercase tracking-widest">Bar</span></div>
      </div>
      <div className="mt-auto flex gap-3">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-3 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold hover:border-gold transition-all duration-300">
          Inspect
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-3 bg-luxury-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300">
          Book
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const filters = ['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'];

const RoomInventory = () => {
  const [filter, setFilter] = useState('All');

  const filteredRooms = useMemo(() => {
    if (filter === 'All') return rooms;
    return rooms.filter((room) => room.status === filter);
  }, [filter]);

  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Room Inventory</h2>
          <p className="page-subtitle">Live status of luxury residences</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-white border border-gray-100 p-1 shadow-sm">
            {filters.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`relative px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  filter === t ? 'text-white' : 'text-gray-400 hover:text-luxury-black'
                }`}
              >
                {filter === t && (
                  <motion.span
                    layoutId="room-filter"
                    className="absolute inset-0 bg-luxury-black"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-3 btn-gold">
            <Plus size={16} />
            Add Room
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-gray-400 text-sm tracking-widest uppercase"
            >
              No rooms match this filter
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomInventory;
