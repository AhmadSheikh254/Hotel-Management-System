import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHotel, FaUsers, FaDoorOpen, FaRegChartBar, FaReceipt, FaTools, FaSignOutAlt } from 'react-icons/fa'

const item = (to, label, Icon) => (
  <NavLink to={to} className={({isActive})=> 'nav-link' + (isActive? ' active':'')}>
    <Icon style={{marginRight:8}} /> {label}
  </NavLink>
)

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div style={{padding:16,borderBottom:'1px solid #eef2f7'}}>
        <h3 style={{margin:0,color:'#0b3b66'}}>LuxuryStay</h3>
        <div style={{fontSize:12,color:'#64748b'}}>Hospitality Dashboard</div>
      </div>
      <nav style={{paddingTop:8}}>
        {item('/dashboard','Dashboard', FaRegChartBar)}
        {item('/rooms','Rooms', FaDoorOpen)}
        {item('/bookings','Bookings', FaHotel)}
        {item('/staff','Staff', FaUsers)}
        {item('/guests','Guests', FaUsers)}
        {item('/billing','Billing', FaReceipt)}
        {item('/housekeeping','Housekeeping', FaTools)}
        {item('/reports','Reports', FaRegChartBar)}
        {item('/settings','Settings', FaTools)}
      </nav>
      <div style={{position:'absolute',bottom:20,left:0,right:0,padding:16}}>
        <a href="#" className="nav-link">Help & Docs</a>
        <a href="#" className="nav-link">Sign out <FaSignOutAlt style={{float:'right'}}/></a>
      </div>
    </aside>
  )
}
