import React from 'react'

export default function Settings(){
  return (
    <div>
      <h2>Settings</h2>
      <div className="card">
        <h4>User Roles & Permissions</h4>
        <p>Manage roles: Admin, Manager, Receptionist, Housekeeping (UI only).</p>
      </div>
      <div className="card">
        <h4>Profile Settings</h4>
        <p>Update profile preferences and notification settings (UI only).</p>
      </div>
    </div>
  )
}
