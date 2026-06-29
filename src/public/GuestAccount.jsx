import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, History, User, ConciergeBell, LogOut, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getBookings, updateGuestProfile, getServiceRequests } from '../api/hotelApi';
import { additionalServices } from '../data/hotelData';
import PageLoader from '../components/public/PageLoader';
import AlertMessage from '../components/public/AlertMessage';
import LoadingSpinner from '../components/public/LoadingSpinner';
import FormField from '../components/public/FormField';
import MotionSection from '../components/public/MotionSection';
import { validateName, validatePhone } from '../utils/validation';

const tabs = [
  { id: 'reservations', label: 'Upcoming', icon: Calendar },
  { id: 'history', label: 'History', icon: History },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'services', label: 'My Requests', icon: ConciergeBell },
];

function maskEmail(email) {
  if (!email) return '';
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const masked = user.length > 2 ? `${user[0]}${'*'.repeat(Math.min(user.length - 1, 4))}` : user;
  return `${masked}@${domain}`;
}

export default function GuestAccount() {
  const { user, logout, updateUser } = useAuth();
  const guestId = user?.id || user?._id;
  const [activeTab, setActiveTab] = useState('reservations');
  const [bookings, setBookings] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!guestId) return;
    setLoadingData(true);
    setError('');
    Promise.all([
      getBookings(guestId).then(setBookings).catch(() => setBookings([])),
      getServiceRequests(guestId).then(setServiceRequests).catch(() => setServiceRequests([])),
    ]).finally(() => setLoadingData(false));
  }, [guestId]);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, email: user.email, phone: user.phone || '' });
    }
  }, [user]);

  const upcoming = bookings.filter((b) => new Date(b.from) >= new Date() || b.status === 'Pending');
  const history = bookings.filter((b) => new Date(b.to) < new Date() && b.status !== 'Pending');

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const errs = {
      name: validateName(profile.name),
      phone: validatePhone(profile.phone),
    };
    setFieldErrors(errs);
    if (errs.name || errs.phone) return;

    setSaving(true);
    setError('');
    try {
      const updated = await updateGuestProfile(guestId, { name: profile.name.trim(), phone: profile.phone.trim() });
      updateUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      setError(err.message || 'Could not update profile. Please try again.');
    }
    setSaving(false);
  };

  const statusColor = (s) => {
    if (s === 'Confirmed') return 'bg-green-50 text-green-800 border-green-200';
    if (s === 'Pending') return 'bg-gold/10 text-gold border-gold/20';
    return 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="pt-28 pb-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <MotionSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Guest Portal</span>
            <h1 className="page-title">Welcome, {user?.name?.split(' ')[0]}</h1>
            <p className="text-xs text-gray-500 mt-1">Signed in as {maskEmail(user?.email)}</p>
          </div>
          <button type="button" onClick={logout} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors focus-visible:outline-gold">
            <LogOut size={14} aria-hidden="true" /> Sign Out Securely
          </button>
        </MotionSection>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4" role="tablist" aria-label="Account sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-gold ${
                  selected ? 'bg-luxury-black text-white' : 'text-gray-500 hover:text-luxury-black'
                }`}
              >
                <Icon size={14} aria-hidden="true" /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="luxury-card p-6 md:p-8" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {error && <AlertMessage type="error" className="mb-6">{error}</AlertMessage>}

          {loadingData ? (
            <PageLoader message="Loading your account..." />
          ) : (
            <>
              {activeTab === 'reservations' && (
                <>
                  <h2 className="font-serif text-xl mb-6">Upcoming Reservations</h2>
                  {upcoming.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No upcoming reservations.</p>
                      <Link to="/reservations" className="btn-gold !px-6 !py-3">Book a Stay</Link>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {upcoming.map((b) => (
                        <li key={b.id || b._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-gray-100 hover:border-gold/30 transition-colors">
                          <div>
                            <p className="font-semibold">{b.roomName}</p>
                            <p className="text-sm text-gray-500 mt-1">{b.from} → {b.to} • {b.guests} guest{b.guests > 1 ? 's' : ''}</p>
                          </div>
                          <span className={`self-start px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${statusColor(b.status)}`}>{b.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <h2 className="font-serif text-xl mb-6">Booking History</h2>
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No past bookings yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {history.map((b) => (
                        <li key={b.id || b._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-gray-100">
                          <div>
                            <p className="font-semibold">{b.roomName}</p>
                            <p className="text-sm text-gray-500 mt-1">{b.from} → {b.to}</p>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Completed</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {activeTab === 'profile' && (
                <>
                  <h2 className="font-serif text-xl mb-2">Profile Information</h2>
                  <p className="text-xs text-gray-500 mb-6">Your personal details are kept confidential and used only for service purposes.</p>
                  {saved && <AlertMessage type="success" className="mb-4">Profile updated successfully.</AlertMessage>}
                  <form onSubmit={handleSaveProfile} className="space-y-5 max-w-md" noValidate>
                    <FormField id="profile-name" label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} error={fieldErrors.name} required autoComplete="name" />
                    <FormField id="profile-email" label="Email" value={profile.email} disabled hint={`Displayed securely as ${maskEmail(profile.email)}`} />
                    <FormField id="profile-phone" label="Phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} error={fieldErrors.phone} autoComplete="tel" />
                    <button type="submit" disabled={saving} className="btn-gold !px-6 !py-3 flex items-center gap-2" aria-busy={saving}>
                      {saving ? <><LoadingSpinner size={14} /> Saving...</> : <><Save size={14} aria-hidden="true" /> Save Changes</>}
                    </button>
                  </form>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                    <h2 className="font-serif text-xl">Service Requests</h2>
                    <Link to="/services" className="text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">Request Service →</Link>
                  </div>
                  {serviceRequests.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">No service requests yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {serviceRequests.map((r) => (
                        <li key={r.id || r._id} className="p-5 border border-gray-100">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-semibold">{additionalServices.find((s) => s.id === r.serviceType)?.name || r.serviceType}</p>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-gold shrink-0">{r.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Room {r.roomNumber}{r.notes ? ` • ${r.notes}` : ''}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
