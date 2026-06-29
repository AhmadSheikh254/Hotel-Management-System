import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import MotionSection from '../components/public/MotionSection';

export default function NotFound() {
  return (
    <div className="page-container min-h-[70vh] flex flex-col items-center justify-center text-center">
      <MotionSection reveal={false}>
        <p className="section-label mb-4">404</p>
        <h1 className="section-title mb-4">Page Not Found</h1>
        <p className="section-desc mx-auto mb-10">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-gold !px-8 inline-flex items-center gap-2">
            <Home size={14} aria-hidden="true" /> Return Home
          </Link>
          <Link to="/rooms" className="btn-outline !px-8">Browse Rooms</Link>
        </div>
      </MotionSection>
    </div>
  );
}
