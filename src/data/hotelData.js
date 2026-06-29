export const brand = {
  name: 'LuxuryStay',
  tagline: 'Hospitality',
  fullName: 'LuxuryStay Hospitality',
  email: 'reservations@luxurystay.com',
  phone: '+1 (800) LUX-STAY',
  address: 'Via della Marina 12, Amalfi Coast, Italy 84011',
  coordinates: { lat: 40.634, lng: 14.602 },
};

export const amenities = [
  { id: 'spa', title: 'Spa & Wellness', description: 'World-class treatments and thermal suites.', icon: 'spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec92?auto=format&fit=crop&q=80&w=800' },
  { id: 'pool', title: 'Infinity Pool', description: 'Panoramic coastal views from our heated pool.', icon: 'pool', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800' },
  { id: 'gym', title: 'Fitness Center', description: '24/7 access to premium equipment and trainers.', icon: 'gym', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
  { id: 'restaurant', title: 'Fine Dining', description: 'Michelin-inspired cuisine with coastal ingredients.', icon: 'restaurant', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800' },
  { id: 'room-service', title: 'Room Service', description: 'Gourmet dining delivered to your suite, anytime.', icon: 'room-service', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800' },
  { id: 'transfer', title: 'Airport Transfer', description: 'Private chauffeur service from arrival to departure.', icon: 'transfer', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800' },
  { id: 'wifi', title: 'Complimentary WiFi', description: 'High-speed connectivity throughout the property.', icon: 'wifi', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' },
];

export const additionalServices = [
  { id: 'room-service', name: 'Room Service', description: 'In-suite dining and beverages on demand.' },
  { id: 'laundry', name: 'Laundry & Dry Cleaning', description: 'Same-day pressing and garment care.' },
  { id: 'wake-up', name: 'Wake-up Calls', description: 'Personalized morning calls at your preferred time.' },
  { id: 'airport', name: 'Airport Transfers', description: 'Luxury vehicle pickup and drop-off.' },
  { id: 'transport', name: 'Transportation Assistance', description: 'Private cars, yachts, and helicopter arrangements.' },
];

export const testimonials = [
  { id: 1, name: 'James Alexander Sterling', role: 'Connoisseur Traveller', rating: 5, text: 'An extraordinary stay. The attention to detail is remarkable, and the atmosphere at LuxuryStay is simply magical.' },
  { id: 2, name: 'Sarah Miller', role: 'Business Executive', rating: 5, text: 'Unmatched ambiance and impeccable service throughout our stay. Every request was anticipated before we asked.' },
  { id: 3, name: 'Elena Rodriguez', role: 'Luxury Blogger', rating: 5, text: 'The spa, dining, and suite experience exceeded every expectation. Truly a five-star sanctuary on the coast.' },
  { id: 4, name: 'Marcus Sterling', role: 'Frequent Guest', rating: 5, text: 'From arrival to departure, LuxuryStay Hospitality delivers precision in every detail. Our preferred destination worldwide.' },
];

export const roomCategories = [
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    category: 'Suite',
    price: 450,
    occupancy: 2,
    size: '55 m²',
    beds: '1 King Bed',
    status: 'Available',
    description: 'Elegant suite with panoramic coastal views, marble bathroom, and private balcony.',
    amenities: ['WiFi', 'Mini Bar', 'Smart TV', 'Ocean View', 'Rain Shower'],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'royal-garden',
    name: 'Royal Garden View',
    category: 'Premium',
    price: 680,
    occupancy: 3,
    size: '72 m²',
    beds: '1 King + Sofa Bed',
    status: 'Available',
    description: 'Spacious retreat overlooking our private gardens with separate living area.',
    amenities: ['WiFi', 'Garden Terrace', 'Nespresso', 'Butler Service', 'Soaking Tub'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    category: 'Presidential',
    price: 1200,
    occupancy: 4,
    size: '120 m²',
    beds: '2 King Bedrooms',
    status: 'Limited',
    description: 'The pinnacle of luxury with private dining, study, and wraparound terrace.',
    amenities: ['WiFi', 'Private Chef', 'Jacuzzi', 'Panoramic View', 'Personal Concierge'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'executive',
    name: 'Executive Room',
    category: 'Executive',
    price: 320,
    occupancy: 2,
    size: '42 m²',
    beds: '1 Queen Bed',
    status: 'Available',
    description: 'Refined comfort for the discerning business traveler with workspace and city views.',
    amenities: ['WiFi', 'Work Desk', 'Smart TV', 'Coffee Machine'],
    images: [
      'https://images.unsplash.com/photo-1591088398332-f0235686fc4e?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'penthouse',
    name: 'Penthouse Residence',
    category: 'Penthouse',
    price: 2500,
    occupancy: 6,
    size: '200 m²',
    beds: '3 Bedrooms',
    status: 'Available',
    description: 'Exclusive top-floor residence with private pool and 360° coastal panorama.',
    amenities: ['WiFi', 'Private Pool', 'Chef Kitchen', 'Cinema Room', 'Helipad Access'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'classic',
    name: 'Classic Double',
    category: 'Classic',
    price: 220,
    occupancy: 2,
    size: '32 m²',
    beds: '1 Double Bed',
    status: 'Available',
    description: 'Thoughtfully appointed room with timeless elegance and modern comforts.',
    amenities: ['WiFi', 'Smart TV', 'Rain Shower'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    ],
  },
];

export function getRoomById(id) {
  return roomCategories.find((r) => r.id === id);
}
