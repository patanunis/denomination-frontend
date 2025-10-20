import { Navigate } from 'react-router-dom';

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) return <Navigate to="/login" />;

  return allowedRoles.includes(user.role)
    ? children
    : <Navigate to="/employee" />;
}
