import { useState } from 'react';
import axios from 'axios';
import RolePicker from '../components/RolePicker';

export default function Register() {
  const [form, setForm] = useState({ role: '', name: '', mobile: '', password: '', email: '' });

  const handleRegister = async () => {
    await axios.post('/api/auth/register', form);
    alert('Registered successfully');
  };

  return (
    <div>
      <h2>Register</h2>
      <RolePicker value={form.role} onChange={role => setForm({ ...form, role })} />
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Mobile" onChange={e => setForm({ ...form, mobile: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
