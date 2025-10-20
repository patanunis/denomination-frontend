import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

 const hideRoutes = ['/login', '/register', '/forgot-password'];
  if (hideRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    // ✅ Clear session
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);

    // ✅ Show toast and redirect
    toast.success('Successfully logged out');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {user?.role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
        {user?.role === 'Employee' && <Link to="/employee">Employee Dashboard</Link>}
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
