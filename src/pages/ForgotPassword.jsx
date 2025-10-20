import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import api from '../apis';
import './AuthForm.css';

function ForgotPassword() {
  const [role, setRole] = useState('Employee');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', {
        Email_ID: email,
        newPassword: newPassword
      });
      toast.success('Password updated successfully');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Forgot Password</h2>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        <p>Remembered your password? <Link to="/">Log In</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
