// Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context';

export default function Login() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ role: '', email: '', password: '' });

  const handleLogin = async () => {
    const res = await axios.post('/api/auth/login', form);
    setUser(res.data.user); // { role, name, id }
  };

  return (
    <div>
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="">Select Role</option>
        <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
      </select>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
