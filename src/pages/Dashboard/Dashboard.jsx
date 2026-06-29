import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DoorOpen,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const data = [
  { name: 'Mon', revenue: 4000, occupancy: 85 },
  { name: 'Tue', revenue: 3000, occupancy: 70 },
  { name: 'Wed', revenue: 5000, occupancy: 90 },
  { name: 'Thu', revenue: 2780, occupancy: 65 },
  { name: 'Fri', revenue: 6890, occupancy: 95 },
  { name: 'Sat', revenue: 8390, occupancy: 98 },
  { name: 'Sun', revenue: 7490, occupancy: 92 },
];

const arrivals = [
  { name: 'Marcus Sterling', room: 'Suite 402', time: '10:30 AM', status: 'checked-in' },
  { name: 'Elena Rodriguez', room: 'Deluxe 205', time: '11:45 AM', status: 'arriving' },
  { name: 'Jonathan Wick', room: 'Suite 501', time: '1:15 PM', status: 'pending' },
  { name: 'Sophia Chen', room: 'Standard 108', time: '2:30 PM', status: 'checked-out' },
];

const StatCard = ({ title, value, icon, trend, percentage }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{ y: -4 }}
    className="luxury-card p-8 group overflow-hidden relative"
  >
    <div className="absolute top-0 right-0 w-28 h-28 bg-gold/5 rounded-full -mr-14 -mt-14 transition-transform duration-700 group-hover:scale-150" />
    <div className="flex justify-between items-start relative z-10">
      <div className="p-3 bg-soft-beige text-gold rounded-full border border-gold/10 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div
        className={`flex items-center gap-1 text-[10px] font-bold tracking-widest ${
          trend === 'up' ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {percentage}%
      </div>
    </div>
    <div className="mt-8 relative z-10">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">{title}</p>
      <h3 className="text-4xl font-serif mt-2 text-luxury-black">{value}</h3>
    </div>
  </motion.div>
);

const statusStyles = {
  'checked-in': 'text-green-600',
  arriving: 'text-blue-600',
  pending: 'text-gold',
  'checked-out': 'text-gray-400',
};

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Manager Overview</h2>
          <p className="page-subtitle">Property: Roxandrea Amalfi Coast</p>
        </div>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-outline">
            Download Data
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-gold">
            New Reservation
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard title="Total Revenue" value="$45,280" icon={<TrendingUp size={22} />} trend="up" percentage="12.5" />
        <StatCard title="Active Guests" value="128" icon={<Users size={22} />} trend="up" percentage="8.2" />
        <StatCard title="Room Occupancy" value="94%" icon={<DoorOpen size={22} />} trend="down" percentage="2.4" />
        <StatCard title="Guest Rating" value="4.9" icon={<Star size={22} />} trend="up" percentage="0.5" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.15 }}
          className="lg:col-span-2 luxury-card p-8 md:p-10"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-serif text-2xl">Financial Performance</h3>
            <select className="bg-soft-beige border border-gray-100 text-[10px] font-bold uppercase tracking-widest px-4 py-2 outline-none cursor-pointer hover:border-gold/40 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '2px',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.08)',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.25 }}
          className="luxury-card p-8 md:p-10 flex flex-col"
        >
          <h3 className="font-serif text-2xl mb-8">Recent Arrivals</h3>
          <div className="flex-1 space-y-6">
            {arrivals.map((guest, i) => (
              <motion.div
                key={guest.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between group cursor-pointer py-1"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-soft-beige border border-gold/10 flex items-center justify-center text-gold font-serif text-lg font-bold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    {guest.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-luxury-black">{guest.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{guest.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400">{guest.time}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${statusStyles[guest.status]}`}>
                    {guest.status.replace('-', ' ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-8 py-4 w-full border border-gray-100 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-gold hover:border-gold transition-all duration-300"
          >
            Manage All Arrivals
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
