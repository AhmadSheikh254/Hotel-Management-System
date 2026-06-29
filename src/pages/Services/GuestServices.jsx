import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Car, Sparkles, Star, Clock, MoreHorizontal, Send } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const requests = [
  { id: 'SR-1024', guest: 'Marcus Sterling', room: '402', type: 'Dining', item: 'Late Night Dinner', status: 'In Kitchen', time: '15 mins ago' },
  { id: 'SR-1025', guest: 'Elena Rodriguez', room: '205', type: 'Transport', item: 'Airport Transfer', status: 'Confirmed', time: '1h ago' },
  { id: 'SR-1026', guest: 'Julian Blackwood', room: '301', type: 'Wellness', item: 'Spa Massage', status: 'Pending', time: 'Just now' },
];

const typeIcons = { Dining: Utensils, Transport: Car, Wellness: Sparkles };

const GuestServices = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Guest Services</h2>
          <p className="page-subtitle">Concierge & experience management</p>
        </div>
        <div className="flex bg-white border border-gray-100 p-1 shadow-sm">
          <button type="button" className="px-6 py-2 bg-luxury-black text-white text-[10px] font-bold uppercase tracking-widest">Queue</button>
          <button type="button" className="px-6 py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-luxury-black transition-colors">Insights</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-5">
            <h3 className="font-serif text-2xl">Active Requests</h3>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] border border-gold/20 px-4 py-1">8 Priority</span>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
            {requests.map((req) => {
              const Icon = typeIcons[req.type] || Sparkles;
              return (
                <motion.div
                  key={req.id}
                  variants={staggerItem}
                  whileHover={{ x: 6 }}
                  className="luxury-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group bg-white"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 flex items-center justify-center border border-gray-50 bg-soft-beige group-hover:border-gold group-hover:scale-105 transition-all duration-300">
                      <Icon size={28} className="text-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="text-xl font-serif">{req.item}</h4>
                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">{req.id}</span>
                      </div>
                      <p className="text-sm font-bold text-luxury-black">
                        {req.guest}
                        <span className="text-gray-300 font-normal mx-2">|</span>
                        <span className="text-gold font-serif italic">Suite {req.room}</span>
                      </p>
                      <div className="flex items-center gap-2 text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                        <Clock size={11} className="text-gold" />
                        {req.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${req.status === 'Pending' ? 'text-gold' : 'text-blue-600'}`}>
                      {req.status}
                    </span>
                    <motion.button whileHover={{ scale: 1.05 }} type="button" className="h-10 w-10 border border-gray-100 flex items-center justify-center text-gray-300 hover:border-luxury-black hover:text-luxury-black transition-all">
                      <MoreHorizontal size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="space-y-6">
          <motion.div {...fadeInUp} transition={{ delay: 0.15 }} className="luxury-card p-8 bg-luxury-black text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -mr-24 -mt-24" />
            <div className="relative z-10">
              <h3 className="font-serif text-2xl mb-2">Staff Broadcast</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">Send team notification</p>
              <textarea
                className="w-full bg-transparent border-b border-white/10 p-0 text-xs tracking-widest outline-none focus:border-gold resize-none py-3 placeholder:text-gray-700 transition-colors"
                rows={4}
                placeholder="Write your message..."
              />
              <motion.button whileHover={{ scale: 1.02 }} className="w-full btn-gold !py-4 mt-6 flex items-center justify-center gap-3 group">
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                Send
              </motion.button>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="luxury-card p-8 bg-white">
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-50">
              <h3 className="font-serif text-2xl">Guest Feedback</h3>
              <div className="flex items-center gap-2 text-gold">
                <Star size={16} fill="currentColor" />
                <span className="text-lg font-serif">4.9</span>
              </div>
            </div>
            <div className="space-y-8">
              {[
                { name: 'Sarah Miller', comment: 'Unmatched ambiance and impeccable service throughout our stay.', rating: 5 },
                { name: 'Jonathan Sterling', comment: 'Exceptional dining experience. Every detail was anticipated.', rating: 5 },
              ].map((feedback, i) => (
                <motion.div
                  key={feedback.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="space-y-3 group cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{feedback.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(feedback.rating)].map((_, j) => (
                        <Star key={j} size={10} fill="#D4AF37" color="#D4AF37" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-serif italic text-gray-500 leading-relaxed group-hover:text-luxury-black transition-colors duration-300">
                    &ldquo;{feedback.comment}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GuestServices;
