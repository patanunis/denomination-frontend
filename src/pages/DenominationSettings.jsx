import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/DenominationSettings.css';

const defaultDenoms = {
  RS_2000: true, RS_500: true, RS_200: true, RS_100: true,
  RS_50: true, RS_20: true, RS_10: true, RS_5: true,
  RS_2: true, RS_1: true
};

export default function DenominationSettings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id || 'default';
  const userRole = user?.role || 'Employee'; // Default fallback

  const [settings, setSettings] = useState(defaultDenoms);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`denomSettings_${userId}`));
    if (saved) setSettings(saved);
  }, [userId]);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem(`denomSettings_${userId}`, JSON.stringify(settings));
    toast.success('Settings saved successfully!');
    setTimeout(() => {
      navigate(userRole === 'Admin' ? '/admin' : '/employee');
    }, 1500);
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h2>Denomination Settings</h2>
        <div className="settings-list">
          {Object.keys(settings).map(key => (
            <div key={key} className="settings-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => handleToggle(key)}
                />
                Show ₹{key.replace('RS_', '')}
              </label>
            </div>
          ))}
        </div>
        <button className="save-btn" onClick={handleSave}>Save Settings</button>
        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    </div>
  );
}
