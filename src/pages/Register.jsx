import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../apis';
import './AuthForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Employee');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        Emp_Name: name,
        Role: role,
        Mobile_No: mobile,
        Email_ID: email,
        Password: password
      });

      toast.success('Registration successful');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="tel" placeholder="Mobile Number" onChange={e => setMobile(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/">Log In</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
