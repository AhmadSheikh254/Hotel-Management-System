import { roomCategories, testimonials as defaultTestimonials } from '../data/hotelData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const FAST = 80;

let rooms = roomCategories.map((r, i) => ({
  id: i + 1,
  slug: r.id,
  number: 100 + i + 1,
  type: r.name,
  category: r.category,
  status: r.status,
  price: r.price,
  occupancy: r.occupancy,
  image: r.images[0],
  ...r,
}));

let bookings = [
  { id: 1, guestId: 1, guestName: 'Alice Smith', guestEmail: 'alice@example.com', roomSlug: 'deluxe-suite', roomName: 'Deluxe Suite', roomId: 1, from: '2026-06-15', to: '2026-06-18', guests: 2, status: 'Confirmed' },
  { id: 2, guestId: 2, guestName: 'Bob Jones', guestEmail: 'bob@example.com', roomSlug: 'executive', roomName: 'Executive Room', roomId: 4, from: '2026-06-20', to: '2026-06-22', guests: 1, status: 'Pending' },
];

let guests = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', password: 'demo123', phone: '+1 555 0101', createdAt: '2025-01-10' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', password: 'demo123', phone: '+1 555 0102', createdAt: '2025-03-22' },
];

let feedbackList = [...defaultTestimonials.map((t, i) => ({ ...t, guestId: null, approved: true, createdAt: '2026-05-01' }))];

let serviceRequests = [];

let staff = [
  { id: 1, name: 'John Manager', role: 'Manager' },
  { id: 2, name: 'Sara Front', role: 'Receptionist' },
];

export async function getRooms() {
  await delay(FAST);
  return rooms;
}

export async function getRoomBySlug(slug) {
  await delay(FAST);
  return rooms.find((r) => r.slug === slug) || null;
}

export async function updateRoom(r) {
  await delay(FAST);
  rooms = rooms.map((x) => (x.id === r.id ? r : x));
  return r;
}

export async function getBookings(guestId) {
  await delay(FAST);
  if (guestId) return bookings.filter((b) => b.guestId === guestId);
  return bookings;
}

export async function createBooking(b) {
  await delay(FAST);
  const room = rooms.find((r) => r.slug === b.roomSlug || r.id === b.roomId);
  const guest = guests.find((g) => g.id === b.guestId);
  const nb = {
    id: bookings.length + 1,
    guestId: b.guestId || null,
    guestName: b.guestName || guest?.name || 'Guest',
    guestEmail: b.guestEmail || guest?.email || '',
    roomSlug: room?.slug || b.roomSlug,
    roomName: room?.name || room?.type || 'Suite',
    roomId: room?.id,
    from: b.from,
    to: b.to,
    guests: b.guests || 1,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0],
  };
  bookings.push(nb);
  return nb;
}

export async function registerGuest({ name, email, password, phone }) {
  await delay(120);
  if (guests.some((g) => g.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const guest = {
    id: guests.length + 1,
    name,
    email,
    password,
    phone: phone || '',
    createdAt: new Date().toISOString().split('T')[0],
  };
  guests.push(guest);
  const { password: _, ...safe } = guest;
  return safe;
}

export async function loginGuest(email, password) {
  await delay(120);
  const guest = guests.find((g) => g.email.toLowerCase() === email.toLowerCase() && g.password === password);
  if (!guest) throw new Error('Invalid email or password.');
  const { password: _, ...safe } = guest;
  return safe;
}

export async function updateGuestProfile(id, updates) {
  await delay(FAST);
  guests = guests.map((g) => (g.id === id ? { ...g, ...updates } : g));
  const guest = guests.find((g) => g.id === id);
  const { password: _, ...safe } = guest;
  return safe;
}

export async function submitFeedback({ guestId, name, rating, text }) {
  await delay(FAST);
  const entry = {
    id: feedbackList.length + 1,
    guestId,
    name,
    role: 'Verified Guest',
    rating,
    text,
    approved: true,
    createdAt: new Date().toISOString().split('T')[0],
  };
  feedbackList.unshift(entry);
  return entry;
}

export async function getFeedback() {
  await delay(FAST);
  return feedbackList.filter((f) => f.approved);
}

export async function submitServiceRequest({ guestId, guestName, roomNumber, serviceType, notes, scheduledAt }) {
  await delay(FAST);
  const req = {
    id: serviceRequests.length + 1,
    guestId,
    guestName,
    roomNumber,
    serviceType,
    notes,
    scheduledAt,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  serviceRequests.push(req);
  return req;
}

export async function getServiceRequests(guestId) {
  await delay(FAST);
  return serviceRequests.filter((r) => r.guestId === guestId);
}

export async function getStaff() {
  await delay(FAST);
  return staff;
}

export async function getGuests() {
  await delay(FAST);
  return guests.map(({ password, ...g }) => g);
}

export default {
  getRooms,
  getRoomBySlug,
  getBookings,
  createBooking,
  registerGuest,
  loginGuest,
  updateGuestProfile,
  submitFeedback,
  getFeedback,
  submitServiceRequest,
  getServiceRequests,
};
