import React from 'react'
import { FaBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa'

export default function Topbar(){
  const [dark, setDark] = React.useState(false)
  React.useEffect(()=>{document.body.style.background = dark? '#0f1724':'#f6f8fb'},[dark])
  return (
    <div className="topbar">
      <div style={{display:'flex',alignItems:'center'}}>
        <h4 style={{margin:0}}>LuxuryStay Hospitality</h4>
      </div>
      <div style={{display:'flex',alignItems:'center'}}>
        <button style={{border:0,background:'transparent',marginRight:12}} title="Notifications"><FaBell size={18} /></button>
        <button onClick={()=>setDark(d=>!d)} style={{border:0,background:'transparent',marginRight:12}} title="Toggle theme">{dark? <FaSun/> : <FaMoon/>}</button>
        <div style={{display:'flex',alignItems:'center'}}>
          <FaUserCircle size={22} style={{marginRight:8}}/>
          <div style={{fontSize:13}}>Admin</div>
        </div>
      </div>
    </div>
  )
}
