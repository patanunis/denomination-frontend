import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    await axios.post('/api/auth/reset-password', { email, role, newPassword });
    alert('Password reset successful');
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <select onChange={e => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
      </select>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="New Password" onChange={e => setNewPassword(e.target.value)} />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}
