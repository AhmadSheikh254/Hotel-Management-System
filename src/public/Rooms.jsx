import React, { useEffect, useState } from 'react';
import { BedDouble } from 'lucide-react';
import { getRooms } from '../api/hotelApi';
import PublicRoomCard from '../components/public/PublicRoomCard';
import SectionHeader from '../components/public/SectionHeader';
import PageLoader from '../components/public/PageLoader';
import AlertMessage from '../components/public/AlertMessage';
import EmptyState from '../components/public/EmptyState';
import MotionSection from '../components/public/MotionSection';

const categories = ['All', 'Suite', 'Premium', 'Presidential', 'Executive', 'Penthouse', 'Classic'];

export default function RoomsPublic() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(() => setError('Unable to load rooms. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? rooms : rooms.filter((r) => r.category === filter);

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Accommodations"
          title="Rooms & Suites"
          as="h1"
          description="Discover our collection of meticulously designed accommodations, each offering refined comfort and breathtaking views."
        />

        {error && <AlertMessage type="error" className="mb-8">{error}</AlertMessage>}

        <MotionSection className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`filter-pill ${filter === cat ? 'filter-pill-active' : 'filter-pill-inactive'}`}
            >
              {cat}
            </button>
          ))}
        </MotionSection>

        {loading ? (
          <PageLoader message="Loading accommodations..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={BedDouble}
            title="No rooms found"
            message="No accommodations match this category. Try selecting a different filter or browse all rooms."
            actionLabel="View All Rooms"
            actionTo="/rooms"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room, i) => (
              <PublicRoomCard key={room.slug || room.id} room={room} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
