import React from 'react'
import Badge from './Badge'

export default function RoomCard({room, onEdit}){
  return (
    <div className="room-card card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:18,fontWeight:700}}>Room {room.number}</div>
          <div style={{color:'#64748b'}}>{room.type} — ${room.price}/night</div>
        </div>
        <Badge status={room.status} />
      </div>
      <div style={{marginTop:12}}>
        <button className="actions" onClick={()=>onEdit(room)}>Edit</button>
      </div>
    </div>
  )
}
