import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import CreateDenomination from './pages/CreateDenomination';
import ViewDenomination from './pages/ViewDenomination';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute'; // ✅ Import role-based wrapper
import AdminCreateDenomination from './pages/AdminCreateDenomination';
import AdminViewDenomination from './pages/AdminViewDenomination';
import DenominationSettings from './pages/DenominationSettings';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/employee',
    element: (
      <ProtectedRoute>
        <EmployeeDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/employee/create',
    element: (
      <ProtectedRoute>
        <CreateDenomination />
      </ProtectedRoute>
    )
  },
  {
    path: '/employee/view',
    element: (
      <ProtectedRoute>
        <ViewDenomination />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <RoleProtectedRoute allowedRoles={['Admin']}>
        <AdminDashboard />
      </RoleProtectedRoute>
    )
  },
  {
    path: '*',
    element: <h1>404: Route not found</h1>
  },
  {
  path: '/admin/create',
  element: (
    <RoleProtectedRoute allowedRoles={['Admin']}>
      <AdminCreateDenomination />
    </RoleProtectedRoute>
  )
},
{
  path: '/admin/view',
  element: (
    <RoleProtectedRoute allowedRoles={['Admin']}>
      <AdminViewDenomination />
    </RoleProtectedRoute>
  )
},

{
  path: '/employee/settings',
  element: (
    <ProtectedRoute>
      <DenominationSettings />
    </ProtectedRoute>
  )
},

{
  path: '/admin/settings',
  element: (
    <RoleProtectedRoute allowedRoles={['Admin']}>
      <DenominationSettings />
    </RoleProtectedRoute>
  )
},

]);

export default function App() {
  return <RouterProvider router={router} />;
}
