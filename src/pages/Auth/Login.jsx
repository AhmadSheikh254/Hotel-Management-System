import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Mail, AlertCircle } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { fadeInUp, scaleIn } from '../../utils/animations';
import { loginStaff } from '../../api/hotelApi';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginStaff(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft-beige flex items-center justify-center p-6 md:p-8 selection:bg-gold selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white luxury-card min-h-[680px] overflow-hidden"
      >
        <motion.div {...fadeInUp} className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <Link to="/" className="text-xl font-bold tracking-[0.4em] mb-10 block hover:opacity-80 transition-opacity">
              LUXURY<span className="text-gold">STAY</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-luxury-black mb-3">Manager Access</h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Enterprise Hospitality Portal
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 mb-4 text-sm border border-red-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-7">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="group border-b border-gray-100 transition-colors focus-within:border-gold pb-4"
              >
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-gold block mb-3">
                  Corporate Email
                </label>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-gray-300 group-focus-within:text-gold transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-gray-300"
                    placeholder="admin@luxury.com"
                  />
                </div>
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="group border-b border-gray-100 transition-colors focus-within:border-gold pb-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 group-focus-within:text-gold">
                    Password
                  </label>
                  <button type="button" className="text-[10px] text-gray-300 hover:text-gold transition-colors font-bold uppercase tracking-widest">
                    Forgot?
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <Lock size={18} className="text-gray-300 group-focus-within:text-gold transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-gray-300"
                    placeholder="Enter your password"
                  />
                </div>
              </motion.div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-200 text-gold focus:ring-gold rounded-sm" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-600">
                Remember this device
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-gold !py-4 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </form>

          <p className="text-[10px] text-gray-300 mt-6 text-center uppercase tracking-widest">
            Demo: admin@luxury.com / admin123
          </p>

          <div className="mt-6 pt-8 border-t border-gray-50 grid grid-cols-2 gap-3">
            <motion.button whileHover={{ scale: 1.02 }} type="button" className="flex items-center justify-center gap-2 py-3 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-gold hover:text-gold transition-all duration-300">
              <FaGoogle size={14} /> Google
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} type="button" className="flex items-center justify-center gap-2 py-3 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-luxury-black hover:text-luxury-black transition-all duration-300">
              <FaGithub size={14} /> GitHub
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          {...scaleIn}
          className="hidden lg:block relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury hotel interior"
            className="w-full h-full object-cover brightness-[0.65] scale-105 hover:scale-110 transition-transform duration-[12s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute bottom-12 left-12 right-12"
          >
            <p className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Property Insights</p>
            <h2 className="text-white text-4xl font-serif leading-tight">
              Precision in <br />
              <span className="italic font-normal">Every Detail</span>
            </h2>
            <div className="mt-8 flex gap-10">
              <div className="text-white">
                <p className="text-2xl font-serif">4.9</p>
                <p className="text-[8px] uppercase tracking-widest opacity-60">Global Rating</p>
              </div>
              <div className="text-white">
                <p className="text-2xl font-serif">12k+</p>
                <p className="text-[8px] uppercase tracking-widest opacity-60">Monthly Guests</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
