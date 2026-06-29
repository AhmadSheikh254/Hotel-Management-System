import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Lock } from 'lucide-react';
import { getRooms, createBooking, processPayment } from '../api/hotelApi';
import { useAuth } from '../context/AuthContext';
import { roomCategories } from '../data/hotelData';
import MotionSection from '../components/public/MotionSection';
import SectionHeader from '../components/public/SectionHeader';
import AlertMessage from '../components/public/AlertMessage';
import ConsentCheckbox from '../components/public/ConsentCheckbox';
import LoadingSpinner from '../components/public/LoadingSpinner';
import PageLoader from '../components/public/PageLoader';
import {
  validateEmail, validateName, validateDateRange, validateRequired,
  validateCardNumber, validateExpiry, validateCvv,
  collectErrors, hasErrors,
} from '../utils/validation';

const STEPS = ['Dates & Guests', 'Room & Details', 'Review', 'Payment'];

export default function ReservationsPublic() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [transactionId, setTransactionId] = useState('');
  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    roomSlug: searchParams.get('room') || '',
    from: searchParams.get('checkIn') || '',
    to: searchParams.get('checkOut') || '',
    guests: Number(searchParams.get('guests')) || 2,
    specialRequests: '',
  });

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(() => setError('Unable to load rooms. Please refresh the page.'))
      .finally(() => setRoomsLoading(false));
  }, []);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, guestName: user.name, guestEmail: user.email }));
  }, [user]);

  const guestId = user?.id || user?._id;
  const selectedRoom = rooms.find((r) => r.slug === form.roomSlug) || roomCategories.find((r) => r.id === form.roomSlug);
  const nights = form.from && form.to ? Math.max(1, Math.ceil((new Date(form.to) - new Date(form.from)) / (86400000))) : 0;
  const total = reservation?.totalAmount || (selectedRoom ? selectedRoom.price * nights : 0);

  const validateStep = (s) => {
    if (s === 1) {
      const errs = collectErrors({ dates: validateDateRange(form.from, form.to) });
      setFieldErrors(errs);
      return !hasErrors(errs);
    }
    if (s === 2) {
      const errs = collectErrors({
        roomSlug: validateRequired(form.roomSlug, 'Room'),
        guestName: validateName(form.guestName),
        guestEmail: validateEmail(form.guestEmail),
      });
      setFieldErrors(errs);
      return !hasErrors(errs);
    }
    if (s === 3) {
      const errs = collectErrors({
        consent: !consent ? 'Please accept the Privacy Policy to continue.' : '',
      });
      setFieldErrors(errs);
      return !hasErrors(errs);
    }
    return true;
  };

  const goToStep = (next) => {
    setError('');
    if (next > step && !validateStep(step)) return;
    setStep(next);
  };

  const handleCreateReservation = async () => {
    if (!validateStep(3)) return;
    setError('');
    setLoading(true);
    try {
      const booking = await createBooking({
        guestId, guestName: form.guestName.trim(), guestEmail: form.guestEmail.trim(),
        roomSlug: form.roomSlug, from: form.from, to: form.to,
        guests: form.guests, specialRequests: form.specialRequests,
      });
      setReservation(booking);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Unable to create reservation. Please try again.');
    }
    setLoading(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const errs = collectErrors({
      cardName: validateRequired(payment.cardName, 'Cardholder name'),
      cardNumber: validateCardNumber(payment.cardNumber),
      expiry: validateExpiry(payment.expiry),
      cvv: validateCvv(payment.cvv),
    });
    setFieldErrors(errs);
    if (hasErrors(errs)) return;

    setError('');
    setLoading(true);
    try {
      const resId = reservation?.id || reservation?._id;
      const result = await processPayment({ reservationId: resId, amount: total, method: 'card', ...payment });
      setTransactionId(result.payment?.transactionId || '');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Payment could not be processed. Please verify your card details.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="pt-28 pb-20 px-5">
        <MotionSection className="max-w-lg mx-auto text-center luxury-card p-10 md:p-12">
          <CheckCircle size={48} className="text-green-600 mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-3xl font-serif mb-4">Booking Confirmed</h1>
          <p className="text-gray-600 mb-4">Thank you, {form.guestName}. Your stay at {selectedRoom?.name} is confirmed.</p>
          {transactionId && <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-8">Ref: {transactionId}</p>}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user && <Link to="/account" className="btn-gold !px-6 !py-3">My Reservations</Link>}
            <Link to="/" className="btn-outline !px-6 !py-3">Return Home</Link>
          </div>
        </MotionSection>
      </div>
    );
  }

  if (roomsLoading) return <PageLoader message="Loading available rooms..." />;

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Reservations"
          title="Book Your Stay"
          as="h1"
          description="Secure booking in four simple steps."
          className="!mb-10"
        />

        <nav className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <div key={label} className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${step > i + 1 ? 'text-gold' : step === i + 1 ? 'text-luxury-black' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-card border text-xs transition-all duration-300 ${step >= i + 1 ? 'border-gold bg-gold text-white shadow-gold-glow' : 'border-gray-200 bg-white'}`} aria-current={step === i + 1 ? 'step' : undefined}>{i + 1}</span>
              <span className="hidden md:inline">{label}</span>
            </div>
          ))}
        </nav>

        <MotionSection className="form-card">
          {error && <AlertMessage type="error" className="mb-6">{error}</AlertMessage>}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl">Select Dates &amp; Guests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Check In *</span>
                  <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="input-luxury w-full" aria-invalid={!!fieldErrors.dates} />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Check Out *</span>
                  <input type="date" min={form.from} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="input-luxury w-full" />
                </label>
              </div>
              {fieldErrors.dates && <p className="text-red-600 text-xs" role="alert">{fieldErrors.dates}</p>}
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Guests</span>
                <select value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="input-luxury w-full cursor-pointer">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => goToStep(2)} className="btn-gold w-full !py-4">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl">Room &amp; Guest Details</h2>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Room Type *</span>
                <select value={form.roomSlug} onChange={(e) => setForm({ ...form, roomSlug: e.target.value })} className={`input-luxury w-full cursor-pointer ${fieldErrors.roomSlug ? 'border-red-300' : ''}`}>
                  <option value="">Select a room</option>
                  {rooms.map((r) => <option key={r.slug} value={r.slug}>{r.name} — ${r.price}/night</option>)}
                </select>
                {fieldErrors.roomSlug && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.roomSlug}</p>}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Full Name *</span>
                  <input type="text" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} className={`input-luxury w-full ${fieldErrors.guestName ? 'border-red-300' : ''}`} autoComplete="name" />
                  {fieldErrors.guestName && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.guestName}</p>}
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Email *</span>
                  <input type="email" value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} className={`input-luxury w-full ${fieldErrors.guestEmail ? 'border-red-300' : ''}`} autoComplete="email" />
                  {fieldErrors.guestEmail && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.guestEmail}</p>}
                </label>
              </div>
              <textarea rows={3} value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className="input-luxury w-full resize-none normal-case" placeholder="Special requests (optional)" />
              <p className="text-xs text-gray-500">Your details are used only to process this reservation. <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link></p>
              <div className="flex gap-3">
                <button type="button" onClick={() => goToStep(1)} className="btn-outline flex-1 !py-4">Back</button>
                <button type="button" onClick={() => goToStep(3)} className="btn-gold flex-1 !py-4">Review</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-serif text-xl">Review Your Reservation</h2>
              <dl className="bg-soft-beige p-6 space-y-3 text-sm">
                {[
                  ['Room', selectedRoom?.name],
                  ['Check In', form.from],
                  ['Check Out', form.to],
                  ['Guests', form.guests],
                  ['Nights', nights],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between"><dt className="text-gray-500">{k}</dt><dd className="font-semibold">{v}</dd></div>
                ))}
                <div className="flex justify-between border-t border-gray-200 pt-3"><dt className="text-gray-500">Total</dt><dd className="font-serif text-xl text-gold">${total.toLocaleString()}</dd></div>
              </dl>
              <ConsentCheckbox checked={consent} onChange={setConsent} error={fieldErrors.consent} id="booking-consent" />
              <div className="flex gap-3">
                <button type="button" onClick={() => goToStep(2)} className="btn-outline flex-1 !py-4">Back</button>
                <button type="button" onClick={handleCreateReservation} disabled={loading} className="btn-gold flex-1 !py-4 flex items-center justify-center gap-2" aria-busy={loading}>
                  {loading ? <><LoadingSpinner size={16} /> Processing...</> : 'Continue to Payment'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handlePayment} className="space-y-5" noValidate>
              <h2 className="font-serif text-xl flex items-center gap-2"><CreditCard size={20} className="text-gold" aria-hidden="true" /> Secure Payment</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Lock size={12} aria-hidden="true" /> Card details are encrypted. We never store full card numbers.</p>
              <div className="bg-soft-beige p-4 text-sm flex justify-between"><span>Amount due</span><span className="font-serif text-lg text-gold">${total.toLocaleString()}</span></div>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Cardholder Name *</span>
                <input type="text" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} className={`input-luxury w-full normal-case ${fieldErrors.cardName ? 'border-red-300' : ''}`} autoComplete="cc-name" />
                {fieldErrors.cardName && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.cardName}</p>}
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Card Number *</span>
                <input type="text" inputMode="numeric" autoComplete="cc-number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className={`input-luxury w-full normal-case ${fieldErrors.cardNumber ? 'border-red-300' : ''}`} placeholder="4242 4242 4242 4242" />
                {fieldErrors.cardNumber && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.cardNumber}</p>}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Expiry *</span>
                  <input type="text" placeholder="MM/YY" maxLength={5} value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className={`input-luxury w-full ${fieldErrors.expiry ? 'border-red-300' : ''}`} autoComplete="cc-exp" />
                  {fieldErrors.expiry && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.expiry}</p>}
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">CVV *</span>
                  <input type="password" maxLength={4} value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className={`input-luxury w-full ${fieldErrors.cvv ? 'border-red-300' : ''}`} autoComplete="cc-csc" />
                  {fieldErrors.cvv && <p className="text-red-600 text-xs mt-1" role="alert">{fieldErrors.cvv}</p>}
                </label>
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full !py-4 flex items-center justify-center gap-2" aria-busy={loading}>
                {loading ? <><LoadingSpinner size={16} /> Processing payment...</> : `Pay $${total.toLocaleString()}`}
              </button>
            </form>
          )}
        </MotionSection>
      </div>
    </div>
  );
}
