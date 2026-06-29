import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/public/FormField';
import AlertMessage from '../components/public/AlertMessage';
import LoadingSpinner from '../components/public/LoadingSpinner';
import MotionSection from '../components/public/MotionSection';
import Logo from '../components/public/Logo';
import { validateEmail, validatePassword, collectErrors, hasErrors } from '../utils/validation';

export default function GuestLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/account';
  const redirectMessage = location.state?.message;

  const validate = () => {
    const errs = collectErrors({
      email: validateEmail(email),
      password: validatePassword(password),
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
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please check your credentials and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container min-h-screen flex items-center justify-center">
      <MotionSection reveal={false} className="max-w-md w-full form-card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6"><Logo /></div>
          <h1 className="text-2xl font-serif mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in securely to manage your reservations and profile.</p>
        </div>

        {redirectMessage && (
          <AlertMessage type="info" className="mb-5">{redirectMessage}</AlertMessage>
        )}

        {error && (
          <AlertMessage type="error" className="mb-5">{error}</AlertMessage>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FormField
            id="login-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
            error={errors.email}
            required
            autoComplete="email"
            placeholder="your@email.com"
          />
          <FormField
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
            error={errors.password}
            required
            autoComplete="current-password"
            placeholder="Your password"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full !py-4 flex items-center justify-center gap-2"
            aria-busy={loading}
          >
            {loading ? <><LoadingSpinner size={16} /> Signing in...</> : <>Sign In <ArrowRight size={16} aria-hidden="true" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-gold font-semibold hover:underline">Register</Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">
          Your session is encrypted. We never display your password.
        </p>
      </MotionSection>
    </div>
  );
}
