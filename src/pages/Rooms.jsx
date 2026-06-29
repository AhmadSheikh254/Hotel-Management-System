import React from 'react'
import { getRooms, updateRoom } from '../api/mockApi'
import RoomCard from '../components/RoomCard'

export default function Rooms(){
  const [rooms, setRooms] = React.useState([])
  const [filter, setFilter] = React.useState({type:'All',status:'All'})
  React.useEffect(()=>{getRooms().then(setRooms)},[])
  const onEdit = (room)=>{
    const updated = {...room, status: room.status === 'Available' ? 'Occupied' : 'Available'}
    updateRoom(updated).then(()=>getRooms().then(setRooms))
  }
  const filtered = rooms.filter(r =>
    (filter.type==='All' || r.type===filter.type) && (filter.status==='All' || r.status===filter.status)
  )
  return (
    <div>
      <h2>Rooms</h2>
      <div style={{display:'flex',gap:12,marginBottom:12}}>
        <select onChange={e=>setFilter(s=>({...s,type:e.target.value}))} value={filter.type}>
          <option>All</option>
          <option>Deluxe</option>
          <option>Suite</option>
          <option>Standard</option>
        </select>
        <select onChange={e=>setFilter(s=>({...s,status:e.target.value}))} value={filter.status}>
          <option>All</option>
          <option>Available</option>
          <option>Occupied</option>
          <option>Cleaning</option>
          <option>Maintenance</option>
        </select>
      </div>
      <div className="rooms-grid">
        {filtered.map(r=> <RoomCard key={r.id} room={r} onEdit={onEdit} />)}
      </div>
    </div>
  )
}
