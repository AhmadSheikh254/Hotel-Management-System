import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './public/PublicLayout';
import ProtectedGuestRoute from './components/public/ProtectedGuestRoute';
import ErrorBoundary from './components/public/ErrorBoundary';
import PageLoader from './components/public/PageLoader';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./public/Home'));
const RoomsPublic = lazy(() => import('./public/Rooms'));
const RoomDetail = lazy(() => import('./public/RoomDetail'));
const ReservationsPublic = lazy(() => import('./public/Booking'));
const ServicesPublic = lazy(() => import('./public/Services'));
const FeedbackPublic = lazy(() => import('./public/Feedback'));
const ContactPublic = lazy(() => import('./public/Contact'));
const GuestLogin = lazy(() => import('./public/GuestLogin'));
const Register = lazy(() => import('./public/Register'));
const GuestAccount = lazy(() => import('./public/GuestAccount'));
const PrivacyPolicy = lazy(() => import('./public/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./public/TermsOfService'));
const NotFound = lazy(() => import('./public/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const RoomInventory = lazy(() => import('./pages/Rooms/RoomInventory'));
const GuestList = lazy(() => import('./pages/Guests/GuestList'));
const Reservations = lazy(() => import('./pages/Reservations/Reservations'));
const Billing = lazy(() => import('./pages/Billing/Billing'));
const Housekeeping = lazy(() => import('./pages/Housekeeping/Housekeeping'));
const GuestServices = lazy(() => import('./pages/Services/GuestServices'));
const AdminLogin = lazy(() => import('./pages/Auth/Login'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader message="Loading LuxuryStay..." />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<RoomsPublic />} />
                <Route path="/rooms/:slug" element={<RoomDetail />} />
                <Route path="/reservations" element={<ReservationsPublic />} />
                <Route path="/services" element={<ServicesPublic />} />
                <Route path="/feedback" element={<FeedbackPublic />} />
                <Route path="/contact" element={<ContactPublic />} />
                <Route path="/login" element={<GuestLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedGuestRoute>
                      <GuestAccount />
                    </ProtectedGuestRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Layout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="guests" element={<GuestList />} />
                <Route path="rooms" element={<RoomInventory />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="billing" element={<Billing />} />
                <Route path="housekeeping" element={<Housekeeping />} />
                <Route path="reports" element={<PageLoader message="Reports coming soon..." />} />
                <Route path="services" element={<GuestServices />} />
              </Route>

            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
