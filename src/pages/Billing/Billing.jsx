import React from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, Search, CreditCard, DollarSign, Receipt, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const invoices = [
  { id: 'INV-2026-001', guest: 'Marcus Sterling', date: 'June 08, 2026', amount: 1250, status: 'Paid', method: 'Credit Card' },
  { id: 'INV-2026-002', guest: 'Julian Blackwood', date: 'June 08, 2026', amount: 3400, status: 'Unpaid', method: 'Bank Transfer' },
  { id: 'INV-2026-003', guest: 'Sarah Miller', date: 'June 07, 2026', amount: 890, status: 'Paid', method: 'Cash' },
  { id: 'INV-2026-004', guest: 'Robert Davis', date: 'June 06, 2026', amount: 1560, status: 'Pending', method: 'Credit Card' },
];

const stats = [
  { label: 'Total Collected', value: '$124,530.00', trend: 'up', percentage: '15.2', icon: DollarSign },
  { label: 'Pending Invoices', value: '$12,840.00', trend: 'down', percentage: '4.1', icon: Receipt },
  { label: 'Avg Transaction', value: '$645.00', trend: 'up', percentage: '2.5', icon: CreditCard },
];

const statusStyles = {
  Paid: 'bg-green-50 text-green-700 border-green-100',
  Unpaid: 'bg-red-50 text-red-600 border-red-100',
  Pending: 'bg-gold/10 text-gold border-gold/20',
};

const Billing = () => {
  return (
    <div className="space-y-10">
      <motion.div {...fadeInUp} className="page-header">
        <div>
          <h2 className="page-title">Finance & Billing</h2>
          <p className="page-subtitle">Revenue control & ledger management</p>
        </div>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.02 }} className="btn-outline flex items-center gap-2">
            <Download size={16} /> Export
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} className="btn-gold flex items-center gap-2">
            <Printer size={16} /> Print
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={staggerItem} whileHover={{ y: -4 }} className="luxury-card p-7 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-soft-beige text-gold rounded-full border border-gold/10">
                  <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold tracking-widest ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.percentage}%
                </div>
              </div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">{stat.label}</p>
              <h3 className="text-3xl font-serif mt-2 text-luxury-black">{stat.value}</h3>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="lg:col-span-2 luxury-card overflow-hidden flex flex-col">
          <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="font-serif text-2xl">Invoice History</h3>
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" placeholder="Search invoices..." className="input-luxury pl-10 py-2.5" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-soft-beige/50">
                  {['ID', 'Guest', 'Amount', 'Status', 'Method', ''].map((h) => (
                    <th key={h} className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv, i) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="table-row-hover group"
                  >
                    <td className="px-6 py-5 text-xs font-bold text-luxury-black font-serif group-hover:text-gold transition-colors cursor-pointer">{inv.id}</td>
                    <td className="px-6 py-5 text-xs text-gray-600">{inv.guest}</td>
                    <td className="px-6 py-5 text-xs font-bold font-serif">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${statusStyles[inv.status]}`}>{inv.status}</span>
                    </td>
                    <td className="px-6 py-5 text-[10px] text-gray-400 font-bold uppercase">{inv.method}</td>
                    <td className="px-6 py-5 text-right">
                      <motion.button whileHover={{ scale: 1.05 }} type="button" className="h-9 w-9 border border-gray-100 flex items-center justify-center text-gray-300 hover:border-gold hover:text-gold transition-all ml-auto">
                        <FileText size={14} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="luxury-card p-8 border-gold/20 flex flex-col shadow-xl">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-lg font-bold tracking-[0.35em]">LUXURY<span className="text-gold">STAY</span></h2>
              <p className="text-[8px] text-gray-400 uppercase tracking-[0.4em] mt-2 font-bold">Invoice Preview</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold">#LX-Draft-01</p>
              <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">June 08, 2026</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="border-b border-gray-50 pb-5">
              <p className="text-[9px] text-gray-300 uppercase font-bold tracking-[0.3em] mb-3">Bill To</p>
              <p className="text-lg font-serif">Marcus Sterling</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Suite 402 • 3 Nights</p>
            </div>
            {[
              ['Accommodation', '$1,350.00'],
              ['Dining & Bar', '$145.00'],
              ['Spa Services', '$220.00'],
              ['Loyalty Discount', '-$171.50'],
            ].map(([label, value]) => (
              <div key={label} className={`flex justify-between text-xs items-center ${label.includes('Discount') ? 'text-red-500' : ''}`}>
                <span className="text-gray-400 uppercase tracking-widest font-bold text-[9px]">{label}</span>
                <span className="font-serif font-bold">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Total</span>
              <span className="text-3xl font-serif text-gold">$1,543.50</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-gold !py-4 shadow-gold-glow">
              Process Payment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Billing;
