import React from 'react'
import { getGuests } from '../api/mockApi'

export default function Guests(){
  const [guests, setGuests] = React.useState([])
  React.useEffect(()=>{getGuests().then(setGuests)},[])
  return (
    <div>
      <h2>Guests</h2>
      <ul>
        {guests.map(g => <li key={g.id}>{g.name} — {g.email}</li>)}
      </ul>
    </div>
  )
}
