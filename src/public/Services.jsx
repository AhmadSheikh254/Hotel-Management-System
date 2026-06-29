import React, { useState } from 'react';
import { Utensils, Shirt, Bell, Plane, Car, Sparkles, Waves, Dumbbell, Wifi } from 'lucide-react';
import { amenities, additionalServices } from '../data/hotelData';
import { submitServiceRequest } from '../api/hotelApi';
import { useAuth } from '../context/AuthContext';
import MotionSection from '../components/public/MotionSection';
import SectionHeader from '../components/public/SectionHeader';
import FormField from '../components/public/FormField';
import ConsentCheckbox from '../components/public/ConsentCheckbox';
import AlertMessage from '../components/public/AlertMessage';
import LoadingSpinner from '../components/public/LoadingSpinner';
import { validateRequired, collectErrors, hasErrors } from '../utils/validation';

const serviceIcons = {
  'room-service': Utensils,
  laundry: Shirt,
  'wake-up': Bell,
  airport: Plane,
  transport: Car,
};

const amenityIcons = { spa: Sparkles, pool: Waves, gym: Dumbbell, restaurant: Utensils, 'room-service': Utensils, transfer: Car, wifi: Wifi };

export default function ServicesPublic() {
  const { user } = useAuth();
  const [form, setForm] = useState({ serviceType: 'room-service', roomNumber: '', notes: '', scheduledAt: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = collectErrors({
      roomNumber: validateRequired(form.roomNumber, 'Room number'),
      consent: consent ? '' : 'Please accept the privacy terms to submit your request.',
    });
    setErrors(errs);
    return !hasErrors(errs);
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;

    setLoading(true);
    try {
      await submitServiceRequest({
        guestId: user?.id,
        guestName: user?.name || 'Guest',
        ...form,
      });
      setSuccess('Your service request has been submitted. Our concierge team will attend to it shortly.');
      setForm({ serviceType: 'room-service', roomNumber: '', notes: '', scheduledAt: '' });
      setConsent(false);
    } catch (err) {
      setError(err.message || 'Unable to submit your request. Please try again or contact the concierge.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Services"
          title="Luxury Amenities & Services"
          as="h1"
          description="Indulge in world-class facilities and personalized services designed for the discerning traveler."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {amenities.map((a) => {
            const Icon = amenityIcons[a.id] || Sparkles;
            return (
              <div key={a.id} className="luxury-card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className="text-gold" aria-hidden="true" />
                    <h3 className="font-serif text-lg">{a.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 font-light">{a.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionSection>
            <h2 className="font-serif text-2xl mb-6">Request Additional Services</h2>
            <div className="space-y-4 mb-8">
              {additionalServices.map((s) => {
                const Icon = serviceIcons[s.id] || Sparkles;
                return (
                  <div key={s.id} className="flex items-start gap-4 p-4 border border-gray-100 hover:border-gold/30 transition-colors">
                    <div className="p-2 bg-soft-beige text-gold shrink-0"><Icon size={18} aria-hidden="true" /></div>
                    <div>
                      <h4 className="font-semibold text-sm">{s.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </MotionSection>

          <MotionSection className="luxury-card p-8 bg-luxury-black text-white">
            <h3 className="font-serif text-xl mb-2">Service Request Form</h3>
            <p className="text-gray-500 text-xs mb-6">Our concierge team will attend to your request promptly.</p>

            {success && <AlertMessage type="success" className="mb-4">{success}</AlertMessage>}
            {error && <AlertMessage type="error" className="mb-4">{error}</AlertMessage>}

            <form onSubmit={handleRequest} className="space-y-5" noValidate>
              <FormField id="service-type" label="Service Type">
                <select
                  id="service-type"
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-gold cursor-pointer text-white"
                >
                  {additionalServices.map((s) => (
                    <option key={s.id} value={s.id} className="bg-luxury-black">{s.name}</option>
                  ))}
                </select>
              </FormField>

              <FormField id="service-room" label="Room Number" error={errors.roomNumber} required>
                <input
                  id="service-room"
                  type="text"
                  value={form.roomNumber}
                  onChange={(e) => { setForm({ ...form, roomNumber: e.target.value }); setErrors((p) => ({ ...p, roomNumber: '' })); }}
                  placeholder="e.g. 402"
                  aria-invalid={!!errors.roomNumber}
                  aria-describedby={errors.roomNumber ? 'service-room-error' : undefined}
                  className={`w-full bg-transparent border-b py-3 text-sm outline-none focus:border-gold placeholder:text-gray-600 text-white ${errors.roomNumber ? 'border-red-400' : 'border-white/20'}`}
                />
              </FormField>

              <FormField id="service-time" label="Preferred Time (Optional)">
                <input
                  id="service-time"
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-gold text-gray-300"
                />
              </FormField>

              <FormField id="service-notes" label="Notes">
                <textarea
                  id="service-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Special instructions..."
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-gold resize-none placeholder:text-gray-600 text-white"
                />
              </FormField>

              <ConsentCheckbox
                id="service-consent"
                checked={consent}
                onChange={(v) => { setConsent(v); setErrors((p) => ({ ...p, consent: '' })); }}
                error={errors.consent}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold !py-4 mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
                aria-busy={loading}
              >
                {loading ? <><LoadingSpinner size={16} /> Submitting...</> : 'Submit Request'}
              </button>
            </form>
          </MotionSection>
        </div>
      </div>
    </div>
  );
}
