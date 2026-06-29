import React, { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import { getFeedback, submitFeedback } from '../api/hotelApi';
import { useAuth } from '../context/AuthContext';
import TestimonialCard from '../components/public/TestimonialCard';
import MotionSection from '../components/public/MotionSection';
import SectionHeader from '../components/public/SectionHeader';
import FormField from '../components/public/FormField';
import AlertMessage from '../components/public/AlertMessage';
import ConsentCheckbox from '../components/public/ConsentCheckbox';
import LoadingSpinner from '../components/public/LoadingSpinner';
import PageLoader from '../components/public/PageLoader';
import { validateName, validateRequired, collectErrors, hasErrors } from '../utils/validation';

export default function FeedbackPublic() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeedback()
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoadingReviews(false));
    if (user) setName(user.name);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errs = collectErrors({
      name: validateName(name),
      text: validateRequired(text, 'Review'),
      consent: !consent ? 'Please accept the Privacy Policy to submit feedback.' : '',
    });
    setErrors(errs);
    if (hasErrors(errs)) return;

    setLoading(true);
    try {
      const entry = await submitFeedback({ guestId: user?.id || user?._id, name: name.trim(), rating, text: text.trim() });
      setReviews((prev) => [entry, ...prev]);
      setSubmitted(true);
      setText('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Could not submit feedback. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Feedback"
          title="Guest Reviews & Ratings"
          as="h1"
          description="Share your LuxuryStay experience. Your feedback helps us maintain our standard of excellence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <MotionSection className="lg:col-span-1 h-fit">
            <form onSubmit={handleSubmit} className="luxury-card p-6 md:p-8" noValidate aria-label="Submit feedback form">
              <h2 className="font-serif text-xl mb-6">Leave Your Review</h2>

              {submitted && <AlertMessage type="success" className="mb-4">Thank you for your feedback!</AlertMessage>}
              {error && <AlertMessage type="error" className="mb-4">{error}</AlertMessage>}

              <div className="space-y-5">
                <FormField id="feedback-name" label="Your Name" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }} error={errors.name} required />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 block" id="rating-label">Rating</span>
                  <div className="flex gap-1" role="group" aria-labelledby="rating-label">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(n)}
                        className="p-1 focus-visible:outline-gold rounded-sm"
                        aria-label={`Rate ${n} out of 5 stars`}
                        aria-pressed={rating === n}
                      >
                        <Star size={22} fill={(hoverRating || rating) >= n ? '#D4AF37' : 'none'} color="#D4AF37" />
                      </button>
                    ))}
                  </div>
                </div>
                <FormField id="feedback-text" label="Your Review">
                  <textarea
                    id="feedback-text"
                    rows={4}
                    value={text}
                    onChange={(e) => { setText(e.target.value); setErrors((p) => ({ ...p, text: '' })); }}
                    className={`input-luxury w-full resize-none normal-case ${errors.text ? 'border-red-300' : ''}`}
                    placeholder="Tell us about your stay..."
                    aria-invalid={!!errors.text}
                  />
                  {errors.text && <p className="text-red-600 text-xs mt-1.5" role="alert">{errors.text}</p>}
                </FormField>
                <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} id="feedback-consent" />
                <button type="submit" disabled={loading} className="btn-gold w-full !py-4 flex items-center justify-center gap-2" aria-busy={loading}>
                  {loading ? <><LoadingSpinner size={16} /> Submitting...</> : <><Send size={16} aria-hidden="true" /> Submit Review</>}
                </button>
              </div>
            </form>
          </MotionSection>

          <div className="lg:col-span-2">
            {loadingReviews ? (
              <PageLoader message="Loading reviews..." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((r, i) => (
                  <TestimonialCard key={r.id || i} testimonial={r} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
