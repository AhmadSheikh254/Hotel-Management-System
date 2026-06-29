import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/hotelData';

export default function PrivacyPolicy() {
  return (
    <article className="pt-28 pb-20 px-5 md:px-8 max-w-3xl mx-auto">
      <header className="mb-10">
        <p className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-serif text-luxury-black mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: June 2026</p>
      </header>

      <div className="prose-luxury space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Our Commitment</h2>
          <p>
            {brand.fullName} respects your privacy. We collect personal information only to deliver hospitality services,
            process reservations, and improve your guest experience.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email, and phone number for account registration and bookings</li>
            <li>Reservation dates, room preferences, and special requests</li>
            <li>Payment details processed securely — card numbers are never stored on our servers</li>
            <li>Feedback and service requests you voluntarily submit</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">How We Use Your Data</h2>
          <p>Your information is used exclusively for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Confirming and managing reservations</li>
            <li>Providing concierge and guest services</li>
            <li>Communicating booking confirmations and updates</li>
            <li>Improving our hospitality offerings</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Data Security</h2>
          <p>
            We use industry-standard encryption for data transmission. Access to personal information is restricted
            to authorized staff. We never sell your data to third parties.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting{' '}
            <a href={`mailto:${brand.email}`} className="text-gold hover:underline">{brand.email}</a>.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Contact</h2>
          <p>
            Questions about this policy? Reach us at{' '}
            <Link to="/contact" className="text-gold hover:underline">our contact page</Link> or {brand.phone}.
          </p>
        </section>
      </div>
    </article>
  );
}
