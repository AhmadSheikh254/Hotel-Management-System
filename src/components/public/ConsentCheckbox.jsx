import React from 'react';
import { Link } from 'react-router-dom';

export default function ConsentCheckbox({ checked, onChange, error, id = 'privacy-consent' }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-4 h-4 border-gray-300 text-gold focus:ring-gold rounded-sm shrink-0"
          aria-describedby={error ? `${id}-error` : `${id}-desc`}
          aria-invalid={!!error}
        />
        <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
          <span id={`${id}-desc`}>
            I agree to the{' '}
            <Link to="/privacy" className="text-gold font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/terms" className="text-gold font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
              Terms &amp; Conditions
            </Link>
            . I understand my information is collected solely to provide hotel services, reservations, and guest support.
          </span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-2 ml-7" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
