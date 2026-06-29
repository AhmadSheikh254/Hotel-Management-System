import React from 'react';

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  autoComplete,
  children,
  hint,
  disabled,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  if (children) {
    return (
      <div className="block">
        <label htmlFor={inputId} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-2 block">
          {label}{required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
        </label>
        {children}
        {hint && <p id={`${inputId}-hint`} className="text-xs text-gray-400 mt-1">{hint}</p>}
        {error && <p id={`${inputId}-error`} className="text-red-600 text-xs mt-1.5" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div className="block">
      <label htmlFor={inputId} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-2 block">
        {label}{required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={`input-luxury w-full ${error ? 'border-red-300 focus:border-red-400' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        {...props}
      />
      {hint && <p id={`${inputId}-hint`} className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <p id={`${inputId}-error`} className="text-red-600 text-xs mt-1.5" role="alert">{error}</p>}
    </div>
  );
}
