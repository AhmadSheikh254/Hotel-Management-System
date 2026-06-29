import React from 'react';
import { Star, Quote } from 'lucide-react';
import MotionSection from './MotionSection';

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <MotionSection
      delay={index * 0.08}
      className="luxury-card p-7 md:p-8 bg-white h-full flex flex-col group"
    >
      <Quote size={20} className="text-gold/40 mb-4 group-hover:text-gold/60 transition-colors" aria-hidden="true" />
      <div className="flex gap-1 mb-4 text-gold" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={13} fill="currentColor" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="text-sm font-serif italic text-gray-600 leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <footer className="pt-4 border-t border-gray-100">
        <p className="text-sm font-semibold text-luxury-black">{testimonial.name}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{testimonial.role}</p>
      </footer>
    </MotionSection>
  );
}
