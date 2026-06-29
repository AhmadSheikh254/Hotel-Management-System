import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, User, Plus, Search, MapPin } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const tasks = [
  { id: 'T-101', room: '402', type: 'Full Sanitization', status: 'In Progress', staff: 'Maria S.', priority: 'High', time: '10:30 AM' },
  { id: 'T-103', room: '205', type: 'Turndown Service', status: 'Pending', staff: 'Unassigned', priority: 'Medium', time: '11:15 AM' },
  { id: 'T-202', room: 'Suite 12', type: 'Amenity Restock', status: 'Pending', staff: 'James L.', priority: 'Low', time: '12:00 PM' },
  { id: 'T-301', room: 'Royal Suite', type: 'HVAC Maintenance', status: 'Blocked', staff: 'Kevin H.', priority: 'Emergency', time: '09:45 AM' },
];

const stats = [
  { label: 'Pending', count: 12, icon: Clock, color: 'text-gold' },
  { label: 'Active', count: 8, icon: User, color: 'text-blue-500' },
  { label: 'Verified', count: 45, icon: CheckCircle2, color: 'text-green-600' },
  { label: 'Attention', count: 3, icon: AlertTriangle, color: 'text-red-500' },
];

const priorityStyles = {
  High: 'bg-red-50 text-red-600 border-red-100',
  Emergency: 'bg-luxury-black text-gold border-none',
  Medium: 'bg-gold/10 text-gold border-gold/20',
  Low: 'bg-gray-50 text-gray-400 border-gray-100',
};

const Housekeeping = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Housekeeping</h2>
          <p className="page-subtitle">Operations & property maintenance</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} className="btn-gold flex items-center gap-2">
          <Plus size={16} /> New Task
        </motion.button>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={staggerItem} whileHover={{ y: -4 }} className="luxury-card p-6 group cursor-pointer relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gold/5 rounded-full -mb-8 -mr-8 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start relative z-10">
                <span className={`p-2.5 rounded-full bg-soft-beige ${stat.color} border border-gold/10`}>
                  <Icon size={18} />
                </span>
                <span className="text-2xl font-serif">{stat.count}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-6 relative z-10">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-5">
            <h3 className="font-serif text-2xl">Task Queue</h3>
            <div className="relative w-56">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" placeholder="Search tasks..." className="input-luxury pl-10 py-2.5" />
            </div>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                variants={staggerItem}
                whileHover={{ x: 4 }}
                className="luxury-card p-6 group bg-white"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center p-3 bg-soft-beige border border-gray-50 min-w-[70px]">
                      <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Room</span>
                      <span className="text-lg font-serif">{task.room}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="text-base font-serif">{task.type}</h4>
                        <span className={`px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest border ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-5 text-[9px] font-bold uppercase tracking-widest text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1.5"><User size={11} className="text-gold" /> {task.staff}</span>
                        <span className="flex items-center gap-1.5"><Clock size={11} className="text-gold" /> {task.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> East Wing</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      task.status === 'In Progress' ? 'text-blue-500' : task.status === 'Pending' ? 'text-gold' : 'text-red-500'
                    }`}>
                      {task.status}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: '#D4AF37', color: '#fff' }}
                      type="button"
                      className="h-10 w-10 border border-gray-100 flex items-center justify-center text-gray-300 transition-all duration-300"
                    >
                      <CheckCircle2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="luxury-card p-8 bg-luxury-black text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -mr-24 -mt-24" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle size={20} className="text-gold" />
              <h3 className="font-serif text-2xl">Maintenance Report</h3>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-white/10 pb-4 group focus-within:border-gold transition-colors">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Location</label>
                <input type="text" placeholder="Room number or area" className="bg-transparent border-none outline-none w-full text-xs tracking-widest placeholder:text-gray-700" />
              </div>
              <div className="border-b border-white/10 pb-4">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Category</label>
                <select className="bg-transparent border-none outline-none w-full text-xs tracking-widest text-gray-400 appearance-none cursor-pointer">
                  <option className="bg-luxury-black">Plumbing</option>
                  <option className="bg-luxury-black">Electrical</option>
                  <option className="bg-luxury-black">HVAC</option>
                  <option className="bg-luxury-black">Furniture</option>
                </select>
              </div>
              <div className="border-b border-white/10 pb-4">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 block mb-2">Description</label>
                <textarea rows={3} placeholder="Describe the issue..." className="bg-transparent border-none outline-none w-full text-xs tracking-widest placeholder:text-gray-700 resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Standard', 'Urgent', 'Critical'].map((p) => (
                  <motion.button key={p} whileHover={{ scale: 1.03 }} type="button" className="py-3 text-[8px] font-bold uppercase tracking-widest border border-white/10 hover:border-gold hover:text-gold transition-all duration-300">
                    {p}
                  </motion.button>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} type="submit" className="w-full btn-gold !py-4 mt-4 shadow-gold-glow">
                Submit Report
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Housekeeping;
