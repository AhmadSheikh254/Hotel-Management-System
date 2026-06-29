import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { getBookings } from '../api/mockApi'

const sample = [
  {month:'Jan', occupancy:55, revenue:12000},
  {month:'Feb', occupancy:62, revenue:15000},
  {month:'Mar', occupancy:70, revenue:18000},
  {month:'Apr', occupancy:75, revenue:21000},
  {month:'May', occupancy:68, revenue:19000}
]

export default function Dashboard(){
  const [bookings, setBookings] = React.useState([])
  React.useEffect(()=>{getBookings().then(setBookings)},[])
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <div className="card">
          <div style={{fontSize:12,color:'#64748b'}}>Occupancy Rate</div>
          <div style={{fontSize:24,fontWeight:700}}>72%</div>
        </div>
        <div className="card">
          <div style={{fontSize:12,color:'#64748b'}}>Monthly Revenue</div>
          <div style={{fontSize:24,fontWeight:700}}>$19,200</div>
        </div>
        <div className="card">
          <div style={{fontSize:12,color:'#64748b'}}>Active Bookings</div>
          <div style={{fontSize:24,fontWeight:700}}>{bookings.length}</div>
        </div>
      </div>
      <div className="card" style={{height:300}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sample} margin={{top:10,right:30,left:0,bottom:0}}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cba135" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#cba135" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#cba135" fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
