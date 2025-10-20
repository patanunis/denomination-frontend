import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apis';
import './AuthForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        Role: role,
        Email_ID: email,
        Password: password
      });

      console.log('✅ Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // ✅ Store full user object
      localStorage.setItem('adminName', res.data.user.name);       // ✅ Store name separately
      localStorage.setItem('employeeName', res.data.user.name);    // ✅ Store name like "Test User"
      toast.success('Login successful');

      setTimeout(() => {
        navigate(role === 'Employee' ? '/employee' : '/admin');
      }, 1500);
    } catch (err) {
      console.error('❌ Login error:', err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} required />
        <div className="auth-options">
          <label><input type="checkbox" /> Remember me</label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button type="submit">Log In</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
