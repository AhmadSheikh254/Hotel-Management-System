import React from 'react';
import MotionSection from './MotionSection';

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  dark = false,
  as: Tag = 'h2',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const labelClass = dark ? 'text-gold' : 'section-label';
  const titleClass = dark ? 'text-white' : 'section-title';
  const descClass = dark ? 'text-gray-400' : 'section-desc';

  return (
    <MotionSection className={`mb-12 md:mb-16 max-w-3xl ${alignClass} ${className}`}>
      {label && <span className={labelClass}>{label}</span>}
      <Tag className={`${titleClass} mt-3`}>{title}</Tag>
      {description && (
        <p className={`${descClass} mt-4`}>{description}</p>
      )}
    </MotionSection>
  );
}
