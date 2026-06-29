import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/public/FormField';
import AlertMessage from '../components/public/AlertMessage';
import ConsentCheckbox from '../components/public/ConsentCheckbox';
import LoadingSpinner from '../components/public/LoadingSpinner';
import MotionSection from '../components/public/MotionSection';
import Logo from '../components/public/Logo';
import {
  validateEmail, validatePassword, validateName, validatePhone,
  collectErrors, hasErrors,
} from '../utils/validation';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const errs = collectErrors({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirm: form.password !== form.confirm ? 'Passwords do not match.' : '',
      consent: !consent ? 'You must accept the Privacy Policy and Terms to register.' : '',
    });
    setErrors(errs);
    return !hasErrors(errs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container min-h-screen flex items-center justify-center">
      <MotionSection reveal={false} className="max-w-md w-full form-card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6"><Logo /></div>
          <h1 className="text-2xl font-serif mb-2">Create Account</h1>
          <p className="text-sm text-gray-500">Join LuxuryStay to manage your stays securely.</p>
        </div>

        {error && <AlertMessage type="error" className="mb-5">{error}</AlertMessage>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField id="reg-name" label="Full Name" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} required autoComplete="name" />
          <FormField id="reg-email" label="Email Address" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} required autoComplete="email" />
          <FormField id="reg-phone" label="Phone (Optional)" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} error={errors.phone} autoComplete="tel" />
          <FormField id="reg-password" label="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} error={errors.password} required autoComplete="new-password" hint="Minimum 6 characters" />
          <FormField id="reg-confirm" label="Confirm Password" type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} error={errors.confirm} required autoComplete="new-password" />

          <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} id="register-consent" />

          <button type="submit" disabled={loading} className="btn-gold w-full !py-4 flex items-center justify-center gap-2 mt-2" aria-busy={loading}>
            {loading ? <><LoadingSpinner size={16} /> Creating account...</> : <>Create Account <ArrowRight size={16} aria-hidden="true" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold font-semibold hover:underline">Sign In</Link>
        </p>
      </MotionSection>
    </div>
  );
}
