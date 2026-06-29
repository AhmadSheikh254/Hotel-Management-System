import api from '../utils/api';
import * as mock from './mockApi';

const useMockFallback = import.meta.env.VITE_USE_MOCK_FALLBACK !== 'false';

const normalizeGuest = (g) => (g ? { ...g, id: g.id || g._id } : g);

async function withFallback(apiCall, mockCall) {
  try {
    return await apiCall();
  } catch (error) {
    if (!useMockFallback) throw error;
    console.warn('[hotelApi] Falling back to mock:', error.message);
    return mockCall();
  }
}

export async function getRooms() {
  return withFallback(
    () => api.get('/rooms/public').then((r) => r.data),
    () => mock.getRooms()
  );
}

export async function getRoomBySlug(slug) {
  return withFallback(
    () => api.get(`/rooms/public/${slug}`).then((r) => r.data),
    () => mock.getRoomBySlug(slug)
  );
}

export async function getBookings(guestId) {
  if (guestId) {
    return withFallback(
      () => api.get('/reservations/my').then((r) => r.data),
      () => mock.getBookings(guestId)
    );
  }
  return withFallback(
    () => api.get('/reservations').then((r) => r.data),
    () => mock.getBookings()
  );
}

export async function createBooking(data) {
  return withFallback(
    () => api.post('/reservations/public', {
      guestId: data.guestId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      roomSlug: data.roomSlug,
      roomId: data.roomId,
      from: data.from,
      to: data.to,
      guests: data.guests,
      specialRequests: data.specialRequests,
    }).then((r) => r.data),
    () => mock.createBooking(data)
  );
}

export async function processPayment(data) {
  return withFallback(
    () => api.post('/payments/process', data).then((r) => r.data),
    () => ({
      success: true,
      payment: {
        transactionId: `MOCK-${Date.now()}`,
        amount: data.amount,
        status: 'Completed',
        cardLast4: (data.cardNumber || '').replace(/\s/g, '').slice(-4) || '4242',
      },
      reservation: { paymentStatus: 'Paid', status: 'Confirmed' },
    })
  );
}

export async function registerGuest(data) {
  return withFallback(
    () => api.post('/guest-auth/register', data).then((r) => {
      const { token, ...guest } = r.data;
      if (token) localStorage.setItem('guest_token', token);
      return normalizeGuest(guest);
    }),
    () => mock.registerGuest(data)
  );
}

export async function loginGuest(email, password) {
  return withFallback(
    () => api.post('/guest-auth/login', { email, password }).then((r) => {
      const { token, ...guest } = r.data;
      if (token) localStorage.setItem('guest_token', token);
      return normalizeGuest(guest);
    }),
    () => mock.loginGuest(email, password)
  );
}

export async function updateGuestProfile(id, updates) {
  return withFallback(
    () => api.put('/guest-auth/profile', updates).then((r) => normalizeGuest(r.data)),
    () => mock.updateGuestProfile(id, updates)
  );
}

export async function submitFeedback(data) {
  return withFallback(
    () => api.post('/feedback', data).then((r) => r.data),
    () => mock.submitFeedback(data)
  );
}

export async function getFeedback() {
  return withFallback(
    () => api.get('/feedback').then((r) => r.data),
    () => mock.getFeedback()
  );
}

export async function submitServiceRequest(data) {
  return withFallback(
    () => api.post('/service-requests', data).then((r) => r.data),
    () => mock.submitServiceRequest(data)
  );
}

export async function getServiceRequests(guestId) {
  return withFallback(
    () => api.get('/service-requests/my').then((r) => r.data),
    () => mock.getServiceRequests(guestId)
  );
}

export async function loginStaff(email, password) {
  const res = await api.post('/auth/login', { email, password });
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
}

export async function getGuests() {
  return withFallback(
    () => api.get('/guests').then((r) => r.data),
    () => mock.getGuests()
  );
}

export async function updateRoom(room) {
  return withFallback(
    () => api.put(`/rooms/${room._id || room.id}`, room).then((r) => r.data),
    () => mock.updateRoom(room)
  );
}

export async function getStaff() {
  return mock.getStaff();
}

export default {
  getRooms,
  getRoomBySlug,
  getBookings,
  createBooking,
  processPayment,
  registerGuest,
  loginGuest,
  updateGuestProfile,
  submitFeedback,
  getFeedback,
  submitServiceRequest,
  getServiceRequests,
  loginStaff,
  getGuests,
  updateRoom,
  getStaff,
};
