import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { brand } from '../data/hotelData';
import MotionSection from '../components/public/MotionSection';
import SectionHeader from '../components/public/SectionHeader';
import FormField from '../components/public/FormField';
import AlertMessage from '../components/public/AlertMessage';
import ConsentCheckbox from '../components/public/ConsentCheckbox';
import LoadingSpinner from '../components/public/LoadingSpinner';
import { validateEmail, validateName, validateRequired, collectErrors, hasErrors } from '../utils/validation';

export default function ContactPublic() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = collectErrors({
      name: validateName(form.name),
      email: validateEmail(form.email),
      subject: validateRequired(form.subject, 'Subject'),
      message: validateRequired(form.message, 'Message'),
      consent: !consent ? 'Please accept the Privacy Policy to submit your inquiry.' : '',
    });
    setErrors(errs);
    if (hasErrors(errs)) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setConsent(false);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          as="h1"
          description="Our concierge team is available around the clock to assist with reservations, inquiries, and special arrangements."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <MotionSection className="space-y-6">
            {[
              { icon: Phone, title: 'Phone', lines: [brand.phone, '24/7 Reservations'] },
              { icon: Mail, title: 'Email', lines: [brand.email, 'Response within 2 hours'] },
              { icon: MapPin, title: 'Location', lines: [brand.address] },
              { icon: Clock, title: 'Front Desk', lines: ['Open 24 hours, 7 days a week'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="luxury-card p-6 flex items-start gap-4 group">
                <div className="p-3 bg-gold/10 text-gold shrink-0 rounded-card transition-colors group-hover:bg-gold group-hover:text-white" aria-hidden="true"><Icon size={20} /></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className={`text-sm ${lines.indexOf(line) === 0 ? 'text-gray-600' : 'text-[10px] text-gray-400 uppercase tracking-widest mt-1'}`}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </MotionSection>

          <MotionSection>
            <form onSubmit={handleSubmit} className="luxury-card p-6 md:p-8" noValidate aria-label="Contact inquiry form">
              <h2 className="font-serif text-xl mb-6">Send an Inquiry</h2>

              {submitted && (
                <AlertMessage type="success" className="mb-4">
                  Thank you! Your message has been received. Our team will respond shortly.
                </AlertMessage>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField id="contact-name" label="Name" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} required autoComplete="name" />
                  <FormField id="contact-email" label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} required autoComplete="email" />
                </div>
                <FormField id="contact-subject" label="Subject" value={form.subject} onChange={(e) => update('subject', e.target.value)} error={errors.subject} required />
                <FormField id="contact-message" label="Message">
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`input-luxury w-full resize-none normal-case ${errors.message ? 'border-red-300' : ''}`}
                    required
                  />
                  {errors.message && <p id="contact-message-error" className="text-red-600 text-xs mt-1.5" role="alert">{errors.message}</p>}
                </FormField>
                <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} id="contact-consent" />
                <button type="submit" disabled={loading} className="btn-gold w-full !py-4 flex items-center justify-center gap-2" aria-busy={loading}>
                  {loading ? <><LoadingSpinner size={16} /> Sending...</> : <><Send size={16} aria-hidden="true" /> Send Message</>}
                </button>
              </div>
            </form>
          </MotionSection>
        </div>

        <MotionSection className="luxury-card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-serif text-xl">Hotel Location</h2>
            <p className="text-sm text-gray-500 mt-1">{brand.address}</p>
          </div>
          <div className="h-64 sm:h-80 md:h-96 bg-soft-beige">
            <iframe
              title="LuxuryStay Hospitality location map"
              src={`https://maps.google.com/maps?q=${brand.coordinates.lat},${brand.coordinates.lng}&z=14&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
