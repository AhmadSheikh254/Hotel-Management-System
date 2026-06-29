import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const loc = useLocation()
  const active = (p) => (loc.pathname === p ? {fontWeight: 'bold'} : {})
  return (
    <nav style={{background:'#0b5', padding:12}}>
      <Link to="/dashboard" style={{marginRight:12, ...active('/dashboard')}}>Dashboard</Link>
      <Link to="/rooms" style={{marginRight:12, ...active('/rooms')}}>Rooms</Link>
      <Link to="/bookings" style={{marginRight:12, ...active('/bookings')}}>Bookings</Link>
      <Link to="/staff" style={{marginRight:12, ...active('/staff')}}>Staff</Link>
      <Link to="/guests" style={{marginRight:12, ...active('/guests')}}>Guests</Link>
      <Link to="/billing" style={{marginRight:12, ...active('/billing')}}>Billing</Link>
      <Link to="/housekeeping" style={{marginRight:12, ...active('/housekeeping')}}>Housekeeping</Link>
      <Link to="/reports" style={{marginRight:12, ...active('/reports')}}>Reports</Link>
    </nav>
  )
}

export default Nav
