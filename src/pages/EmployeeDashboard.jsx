import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/EmployeeDashboard.css';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const storedName = localStorage.getItem('employeeName');
  const fallbackUser = JSON.parse(localStorage.getItem('user') || '{}');
  const employeeName = storedName || fallbackUser.name || 'Employee';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSidebarClick = (tab) => {
    setShowSidebar(false);
    switch (tab) {
      case 'edit':
        navigate('/employee/profile');
        break;
      case 'settings':
        navigate('/employee/settings');
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
          {employeeName.charAt(0)}
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
      </div>

      <div className="dashboard-container">
        <div className="welcome-line">
          <span className="welcome-text">WELCOME,</span>
          <span className="employee-name" style={{ color: 'white' }}>{employeeName}</span>
        </div>

        <div className="dashboard-tabs">
          <button onClick={() => navigate('/employee/view')}>View Denomination</button>
          <button onClick={() => navigate('/employee/create')}>Create Denomination</button>
        </div>
      </div>
    </div>
  );
}
