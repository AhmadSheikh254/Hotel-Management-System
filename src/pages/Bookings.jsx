import React from 'react'
import { getBookings, createBooking, getGuests, getRooms } from '../api/mockApi'

export default function Bookings(){
  const [list, setList] = React.useState([])
  const [guests, setGuests] = React.useState([])
  const [rooms, setRooms] = React.useState([])
  const [form, setForm] = React.useState({guestId:'',roomId:'',from:'',to:''})

  React.useEffect(()=>{getBookings().then(setList);getGuests().then(setGuests);getRooms().then(setRooms)},[])
  const submit = ()=>{
    createBooking({guestId:form.guestId,roomId:form.roomId,from:form.from,to:form.to}).then(()=>getBookings().then(setList))
  }
  return (
    <div>
      <h2>Reservations</h2>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <select value={form.guestId} onChange={e=>setForm({...form,guestId:e.target.value})}>
            <option value="">Select guest</option>
            {guests.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={form.roomId} onChange={e=>setForm({...form,roomId:e.target.value})}>
            <option value="">Select room</option>
            {rooms.map(r=> <option key={r.id} value={r.id}>Room {r.number} — {r.type}</option>)}
          </select>
          <input type="date" value={form.from} onChange={e=>setForm({...form,from:e.target.value})} />
          <input type="date" value={form.to} onChange={e=>setForm({...form,to:e.target.value})} />
          <button onClick={submit}>Create Booking</button>
        </div>
      </div>
      <table className="table card">
        <thead><tr><th>Guest</th><th>Room</th><th>Range</th><th>Status</th></tr></thead>
        <tbody>
          {list.map(b => (
            <tr key={b.id}><td>{b.guestName}</td><td>{b.roomNumber}</td><td>{b.from} → {b.to}</td><td>{b.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
