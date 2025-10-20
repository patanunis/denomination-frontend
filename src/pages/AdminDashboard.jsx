import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const storedName = localStorage.getItem('adminName');
  const fallbackUser = JSON.parse(localStorage.getItem('user') || '{}');
  const adminName = storedName || fallbackUser.name || 'Admin';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSidebarClick = (tab) => {
    setShowSidebar(false);
    switch (tab) {
      case 'edit':
        navigate('/admin/profile');
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <div
          className="profile-icon"
          onClick={() => setShowSidebar(prev => !prev)}
          title="Profile"
        >
          {adminName.charAt(0)}
        </div>
        {showSidebar && (
          <div className="sidebar-menu">
            <div className="sidebar-item" onClick={() => handleSidebarClick('edit')}>
              <span className="sidebar-icon">👤</span>
              <span>Edit Profile</span>
            </div>
            <div className="sidebar-item" onClick={() => handleSidebarClick('settings')}>
              <span className="sidebar-icon">⚙️</span>
              <span>Denomination Settings</span>
            </div>
            <div className="sidebar-item" onClick={() => handleSidebarClick('logout')}>
              <span className="sidebar-icon">🚪</span>
              <span>Logout</span>
            </div>
          </div>
        )}
        <button className="logout-button" onClick={handleLogout} title="Logout">
          <span className="logout-icon">⎋</span>
        </button>
      </div>

      <div className="dashboard-container">
        <div className="welcome-line">
          <span className="welcome-text">Welcome,</span>
          <span className="admin-name">{adminName}</span>
        </div>
        <div className="dashboard-tabs">
          <button onClick={() => navigate('/admin/view')}>View Denomination</button>
          <button onClick={() => navigate('/admin/create')}>Create Denomination</button>
        </div>
      </div>
    </div>
  );
}
