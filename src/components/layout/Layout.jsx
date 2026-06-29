import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-soft-gray">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            className="p-6 md:p-8 overflow-y-auto flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
