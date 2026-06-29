import React from 'react'
import { getStaff, addStaff, updateStaff, deleteStaff } from '../api/mockApi'

export default function Staff(){
  const [team, setTeam] = React.useState([])
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState('Receptionist')
  React.useEffect(()=>{getStaff().then(setTeam)},[])
  const refresh = ()=>getStaff().then(setTeam)
  const onAdd = ()=>{ addStaff({name,role}).then(()=>{setName('');refresh()}) }
  const onDelete = (id)=>{ deleteStaff(id).then(refresh) }
  return (
    <div>
      <h2>Staff Management</h2>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option>Admin</option>
          <option>Manager</option>
          <option>Receptionist</option>
          <option>Housekeeping</option>
        </select>
        <button onClick={onAdd}>Add Staff</button>
      </div>
      <table className="table card">
        <thead><tr><th>Name</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {team.map(s=> (
            <tr key={s.id}><td>{s.name}</td><td>{s.role}</td><td><button onClick={()=>onDelete(s.id)}>Delete</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
