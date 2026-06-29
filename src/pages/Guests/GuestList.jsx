import React from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical, ExternalLink } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const guests = [
  { id: 'GS-001', name: 'Marcus Sterling', email: 'm.sterling@example.com', room: '402', status: 'Checked In', joinDate: 'May 12, 2026' },
  { id: 'GS-002', name: 'Elena Rodriguez', email: 'elena.r@example.com', room: '205', status: 'Arriving', joinDate: 'June 05, 2026' },
  { id: 'GS-003', name: 'Jonathan Wick', email: 'vance@example.com', room: '501', status: 'Pending', joinDate: 'June 08, 2026' },
  { id: 'GS-004', name: 'Sophia Chen', email: 'sophia.c@example.com', room: '108', status: 'Checked Out', joinDate: 'June 01, 2026' },
  { id: 'GS-005', name: 'Julian Blackwood', email: 'j.black@example.com', room: '301', status: 'Checked In', joinDate: 'May 15, 2026' },
];

const statusStyles = {
  'Checked In': 'bg-green-50 text-green-700 border-green-100',
  Arriving: 'bg-blue-50 text-blue-600 border-blue-100',
  Pending: 'bg-gold/10 text-gold border-gold/20',
  'Checked Out': 'bg-gray-50 text-gray-400 border-gray-100',
};

const GuestList = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Guest Registry</h2>
          <p className="page-subtitle">Verified visitors & premium residents</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-gold">
          Register Guest
        </motion.button>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="luxury-card overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="Search guests..." className="input-luxury pl-12" />
          </div>
          <div className="flex gap-6">
            <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">
              Export
            </button>
            <div className="h-4 w-px bg-gray-100" />
            <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-soft-beige/60">
                {['Guest', 'Residency', 'Arrival', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 md:px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer} initial="hidden" animate="visible" className="divide-y divide-gray-50">
              {guests.map((guest) => (
                <motion.tr key={guest.id} variants={staggerItem} className="table-row-hover group">
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-full bg-soft-beige border border-gold/10 flex items-center justify-center text-gold font-serif text-lg font-bold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                        {guest.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-luxury-black">{guest.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{guest.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <span className="text-sm font-bold text-luxury-black">Suite {guest.room}</span>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Executive Tier</p>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-xs font-medium text-gray-600">{guest.joinDate}</td>
                  <td className="px-6 md:px-8 py-5">
                    <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${statusStyles[guest.status]}`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-2">
                      <motion.button whileHover={{ scale: 1.05 }} type="button" className="h-9 w-9 border border-gray-100 flex items-center justify-center text-gray-300 hover:border-gold hover:text-gold transition-all">
                        <ExternalLink size={14} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} type="button" className="h-9 w-9 border border-gray-100 flex items-center justify-center text-gray-300 hover:border-luxury-black hover:text-luxury-black transition-all">
                        <MoreVertical size={14} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Showing 5 of 1,280 guests</p>
          <div className="flex gap-2">
            {['Prev', '01', '02', 'Next'].map((label, i) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.03 }}
                type="button"
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                  i === 1 ? 'bg-luxury-black text-white border-luxury-black' : 'border-gray-100 text-gray-400 hover:border-gold hover:text-gold'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestList;
