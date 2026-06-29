const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email?.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(email.trim())) return 'Please enter a valid email address.';
  return '';
}

export function validatePassword(password, min = 6) {
  if (!password) return 'Password is required.';
  if (password.length < min) return `Password must be at least ${min} characters.`;
  return '';
}

export function validateName(name) {
  if (!name?.trim()) return 'Full name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return '';
}

export function validatePhone(phone) {
  if (!phone?.trim()) return '';
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!/^\+?[\d]{7,15}$/.test(cleaned)) return 'Please enter a valid phone number.';
  return '';
}

export function validateRequired(value, label = 'This field') {
  if (!value?.trim()) return `${label} is required.`;
  return '';
}

export function validateDateRange(checkIn, checkOut) {
  if (!checkIn) return 'Check-in date is required.';
  if (!checkOut) return 'Check-out date is required.';
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start < today) return 'Check-in cannot be in the past.';
  if (end <= start) return 'Check-out must be after check-in.';
  return '';
}

export function validateCardNumber(num) {
  const cleaned = (num || '').replace(/\s/g, '');
  if (!cleaned) return 'Card number is required.';
  if (!/^\d{15,19}$/.test(cleaned)) return 'Please enter a valid card number.';
  return '';
}

export function validateExpiry(expiry) {
  if (!expiry?.trim()) return 'Expiry date is required.';
  if (!/^\d{2}\/\d{2}$/.test(expiry.trim())) return 'Use MM/YY format.';
  const [mm, yy] = expiry.split('/').map(Number);
  if (mm < 1 || mm > 12) return 'Invalid expiry month.';
  const now = new Date();
  const exp = new Date(2000 + yy, mm);
  if (exp <= now) return 'Card has expired.';
  return '';
}

export function validateCvv(cvv) {
  if (!cvv) return 'Security code is required.';
  if (!/^\d{3,4}$/.test(cvv)) return 'Enter a valid 3 or 4 digit CVV.';
  return '';
}

export function collectErrors(fields) {
  const errors = {};
  Object.entries(fields).forEach(([key, msg]) => {
    if (msg) errors[key] = msg;
  });
  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
