import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/hotelData';

export default function TermsOfService() {
  return (
    <article className="pt-28 pb-20 px-5 md:px-8 max-w-3xl mx-auto">
      <header className="mb-10">
        <p className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-serif text-luxury-black mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-500">Last updated: June 2026</p>
      </header>

      <div className="prose-luxury space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Agreement</h2>
          <p>
            By using the {brand.fullName} website and services, you agree to these terms. Please read them carefully
            before making a reservation or creating an account.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Reservations</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All bookings are subject to availability and confirmation</li>
            <li>Check-in and check-out times are as stated during booking</li>
            <li>Cancellation policies apply per room category and season</li>
            <li>Guests must provide accurate personal information</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Payments</h2>
          <p>
            Payments are processed securely. You authorize charges for the total amount displayed at checkout.
            Refunds follow our cancellation policy.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Guest Conduct</h2>
          <p>
            Guests are expected to respect property rules, staff, and fellow guests. We reserve the right to refuse
            service for conduct that compromises safety or comfort.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Liability</h2>
          <p>
            {brand.fullName} is not liable for circumstances beyond our reasonable control, including force majeure events.
            Valuables should be stored in in-room safes.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-serif text-luxury-black mb-2">Contact</h2>
          <p>
            For questions about these terms, visit our{' '}
            <Link to="/contact" className="text-gold hover:underline">contact page</Link> or email {brand.email}.
          </p>
        </section>
      </div>
    </article>
  );
}
