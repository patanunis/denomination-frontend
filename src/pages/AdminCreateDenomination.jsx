import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CreateDenomination.css';

export default function AdminCreateDenomination() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id || 'admin';

  const defaultDenoms = {
    RS_2000: true, RS_500: true, RS_200: true, RS_100: true,
    RS_50: true, RS_20: true, RS_10: true, RS_5: true,
    RS_2: true, RS_1: true
  };

  const denomSettings = JSON.parse(localStorage.getItem(`denomSettings_${userId}`)) || defaultDenoms;
  const visibleDenoms = Object.keys(defaultDenoms).filter(key => denomSettings[key]);

  const [denominations, setDenominations] = useState(
    visibleDenoms.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDenominations(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setDenominations(
      visibleDenoms.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    );
  };

  const calculateTotals = () => {
    let totalAmount = 0;
    let totalNotes = 0;
    const breakdown = {};

    for (const [key, value] of Object.entries(denominations)) {
      const count = parseInt(value) || 0;
      const noteValue = parseInt(key.replace('RS_', ''));
      const amount = count * noteValue;
      breakdown[key] = amount;
      totalAmount += amount;
      totalNotes += count;
    }

    return { totalAmount, totalNotes, breakdown };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { totalAmount, totalNotes } = calculateTotals();

    if (totalNotes === 0) {
      toast.error('Please enter at least one denomination quantity');
      return;
    }

    const payload = {
      ...denominations,
      Total_Amount: totalAmount,
      Total_Number_of_Notes: totalNotes,
      Created_On: new Date(),
      Updated_On: new Date()
    };

    try {
      await api.post('/denomination', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Denomination created successfully');
      setTimeout(() => {
        navigate('/admin/view');
      }, 1500);
    } catch (err) {
      console.error('❌ Denomination creation failed:', err);
      toast.error('Failed to create denomination');
    }
  };

  const { totalAmount, totalNotes, breakdown } = calculateTotals();

  return (
    <div className="create-bg">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Create Denomination</h2>

        <div className="header-row">
          <span>Denomination</span>
          <span>Quantity</span>
          <span>Amount</span>
        </div>

        {visibleDenoms.map((note) => (
          <div className="denom-row" key={note}>
            <label>{note.replace('RS_', '')} ₹</label>
            <input
              type="number"
              name={note}
              value={denominations[note]}
              onChange={handleChange}
              min="0"
            />
            <span>{breakdown[note] || 0} ₹</span>
          </div>
        ))}

        <div className="summary-box">
          <div>Total Notes: {totalNotes}</div>
          <div>Grand Total: ₹{totalAmount}</div>
        </div>

        <button type="submit">Submit</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        <ToastContainer position="top-right" autoClose={1500} />
      </form>
    </div>
  );
}
