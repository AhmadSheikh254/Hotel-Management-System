const Room = require('../models/Room');

const mapRoom = (room) => ({
  id: room._id,
  _id: room._id,
  slug: room.slug || room.roomNumber,
  number: room.roomNumber,
  roomNumber: room.roomNumber,
  name: room.name || room.type,
  type: room.name || room.type,
  category: room.category,
  price: room.price,
  occupancy: room.occupancy,
  size: room.size,
  beds: room.beds,
  description: room.description,
  status: room.status,
  floor: room.floor,
  amenities: room.amenities,
  image: room.image || room.images?.[0],
  images: room.images?.length ? room.images : room.image ? [room.image] : [],
});

const getRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms.map(mapRoom));
};

const getPublicRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms.map(mapRoom));
};

const getRoomBySlug = async (req, res) => {
  const room = await Room.findOne({
    $or: [{ slug: req.params.slug }, { roomNumber: req.params.slug }],
  });
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(mapRoom(room));
};

const createRoom = async (req, res) => {
  const { roomNumber, type, price, floor, amenities, image } = req.body;
  const roomExists = await Room.findOne({ roomNumber });
  if (roomExists) return res.status(400).json({ message: 'Room already exists' });
  const room = await Room.create({ roomNumber, type, price, floor, amenities, image });
  res.status(201).json(mapRoom(room));
};

const updateRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  Object.assign(room, req.body);
  const updatedRoom = await room.save();
  res.json(mapRoom(updatedRoom));
};

module.exports = { getRooms, getPublicRooms, getRoomBySlug, createRoom, updateRoom };
