const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../api/models/User');
const Room = require('../api/models/Room');
const Guest = require('../api/models/Guest');
const Feedback = require('../api/models/Feedback');
const connectDB = require('../api/config/db');

dotenv.config();
connectDB();

const rooms = [
  {
    slug: 'deluxe-suite',
    name: 'Deluxe Suite',
    roomNumber: '402',
    type: 'Deluxe Suite',
    category: 'Suite',
    price: 450,
    occupancy: 2,
    size: '55 m²',
    beds: '1 King Bed',
    description: 'Elegant suite with panoramic coastal views, marble bathroom, and private balcony.',
    floor: 4,
    amenities: ['WiFi', 'Mini Bar', 'Smart TV', 'Ocean View', 'Rain Shower'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    slug: 'royal-garden',
    name: 'Royal Garden View',
    roomNumber: '301',
    type: 'Royal Garden View',
    category: 'Premium',
    price: 680,
    occupancy: 3,
    size: '72 m²',
    beds: '1 King + Sofa Bed',
    description: 'Spacious retreat overlooking private gardens with separate living area.',
    floor: 3,
    amenities: ['WiFi', 'Garden Terrace', 'Nespresso', 'Butler Service'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200',
    images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    slug: 'presidential',
    name: 'Presidential Suite',
    roomNumber: '501',
    type: 'Presidential Suite',
    category: 'Presidential',
    price: 1200,
    occupancy: 4,
    size: '120 m²',
    beds: '2 King Bedrooms',
    description: 'The pinnacle of luxury with private dining, study, and wraparound terrace.',
    floor: 5,
    amenities: ['WiFi', 'Private Chef', 'Jacuzzi', 'Panoramic View'],
    status: 'Limited',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    slug: 'executive',
    name: 'Executive Room',
    roomNumber: '205',
    type: 'Executive Room',
    category: 'Executive',
    price: 320,
    occupancy: 2,
    size: '42 m²',
    beds: '1 Queen Bed',
    description: 'Refined comfort for the discerning business traveler.',
    floor: 2,
    amenities: ['WiFi', 'Work Desk', 'Smart TV', 'Coffee Machine'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1591088398332-f0235686fc4e?auto=format&fit=crop&q=80&w=1200',
    images: ['https://images.unsplash.com/photo-1591088398332-f0235686fc4e?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    slug: 'penthouse',
    name: 'Penthouse Residence',
    roomNumber: '601',
    type: 'Penthouse Residence',
    category: 'Penthouse',
    price: 2500,
    occupancy: 6,
    size: '200 m²',
    beds: '3 Bedrooms',
    description: 'Exclusive top-floor residence with private pool and 360° coastal panorama.',
    floor: 6,
    amenities: ['WiFi', 'Private Pool', 'Chef Kitchen', 'Cinema Room'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200'],
  },
  {
    slug: 'classic',
    name: 'Classic Double',
    roomNumber: '108',
    type: 'Classic Double',
    category: 'Classic',
    price: 220,
    occupancy: 2,
    size: '32 m²',
    beds: '1 Double Bed',
    description: 'Thoughtfully appointed room with timeless elegance.',
    floor: 1,
    amenities: ['WiFi', 'Smart TV', 'Rain Shower'],
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200'],
  },
];

const testimonials = [
  { name: 'James Alexander Sterling', rating: 5, text: 'An extraordinary stay. The attention to detail is remarkable.', role: 'Connoisseur Traveller' },
  { name: 'Sarah Miller', rating: 5, text: 'Unmatched ambiance and impeccable service throughout our stay.', role: 'Business Executive' },
  { name: 'Elena Rodriguez', rating: 5, text: 'The spa, dining, and suite experience exceeded every expectation.', role: 'Luxury Blogger' },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Guest.deleteMany();
    await Feedback.deleteMany();

    await User.create({
      name: 'Admin User',
      email: 'admin@luxury.com',
      password: 'admin123',
      role: 'admin',
    });

    await Room.insertMany(rooms);

    await Guest.create({
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: 'demo123',
      phone: '+1 555 0101',
    });

    await Feedback.insertMany(testimonials);

    console.log('Data Imported!');
    console.log('Admin: admin@luxury.com / admin123');
    console.log('Guest: alice@example.com / demo123');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Guest.deleteMany();
    await Feedback.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
