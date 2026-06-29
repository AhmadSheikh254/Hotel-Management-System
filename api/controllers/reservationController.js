const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const Guest = require('../models/Guest');

const mapReservation = (r) => ({
  id: r._id,
  _id: r._id,
  guestId: r.guest?._id || r.guest,
  guestName: r.guestName || r.guest?.name,
  guestEmail: r.guestEmail || r.guest?.email,
  roomId: r.room?._id || r.room,
  roomSlug: r.room?.slug,
  roomName: r.room?.name || r.room?.type,
  roomNumber: r.room?.roomNumber,
  from: r.checkInDate?.toISOString?.().split('T')[0] || r.checkInDate,
  to: r.checkOutDate?.toISOString?.().split('T')[0] || r.checkOutDate,
  guests: r.guestCount,
  totalAmount: r.totalAmount,
  status: r.status,
  paymentStatus: r.paymentStatus,
  createdAt: r.createdAt,
});

const getReservations = async (req, res) => {
  const reservations = await Reservation.find({}).populate('guest').populate('room');
  res.json(reservations.map(mapReservation));
};

const getMyReservations = async (req, res) => {
  const reservations = await Reservation.find({ guest: req.guest._id })
    .populate('room')
    .sort({ checkInDate: -1 });
  res.json(reservations.map(mapReservation));
};

const createReservation = async (req, res) => {
  const { guest, room, checkInDate, checkOutDate, totalAmount } = req.body;
  const reservation = await Reservation.create({ guest, room, checkInDate, checkOutDate, totalAmount });
  res.status(201).json(reservation);
};

const createPublicReservation = async (req, res) => {
  try {
    const {
      guestId, guestName, guestEmail, roomSlug, roomId,
      from, to, guests, specialRequests,
    } = req.body;

    let room = null;
    if (roomSlug) {
      room = await Room.findOne({ $or: [{ slug: roomSlug }, { roomNumber: roomSlug }] });
    } else if (roomId) {
      room = await Room.findById(roomId);
    }
    if (!room) return res.status(404).json({ message: 'Room not found' });

    let guest = null;
    if (guestId) {
      guest = await Guest.findById(guestId);
    } else if (guestEmail) {
      guest = await Guest.findOne({ email: guestEmail });
      if (!guest) {
        guest = await Guest.create({
          name: guestName || 'Guest',
          email: guestEmail,
          phone: '',
        });
      }
    }
    if (!guest) return res.status(400).json({ message: 'Guest information required' });

    const checkIn = new Date(from);
    const checkOut = new Date(to);
    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const totalAmount = room.price * nights;

    const reservation = await Reservation.create({
      guest: guest._id,
      room: room._id,
      guestName: guestName || guest.name,
      guestEmail: guestEmail || guest.email,
      guestCount: guests || 1,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalAmount,
      specialRequests,
      status: 'Pending',
      paymentStatus: 'Pending',
    });

    const populated = await Reservation.findById(reservation._id).populate('room');
    res.status(201).json(mapReservation(populated));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateReservation = async (req, res) => {
  const { status, paymentStatus } = req.body;
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
  reservation.status = status || reservation.status;
  reservation.paymentStatus = paymentStatus || reservation.paymentStatus;
  const updated = await reservation.save();
  if (status === 'Checked Out') {
    await Room.findByIdAndUpdate(reservation.room, { status: 'Available' });
  }
  res.json(updated);
};

module.exports = {
  getReservations,
  getMyReservations,
  createReservation,
  createPublicReservation,
  updateReservation,
};
