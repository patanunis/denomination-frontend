import { Link } from 'react-router-dom';
import { useAuth } from '../context';

export default function Navbar() {
  const { user, setUser } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user?.role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
      {user?.role === 'Employee' && <Link to="/employee">Employee Dashboard</Link>}
      <button onClick={() => setUser(null)}>Logout</button>
    </nav>
  );
}
