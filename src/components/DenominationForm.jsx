import { useState } from 'react';
import { useAuth } from '../context';
import api from '../apis';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DenominationForm.css'; // ✅ Add this CSS file

const denominations = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

export default function DenominationForm() {
  const { user } = useAuth();
  const [values, setValues] = useState({});

  if (!user) return <p className="loading-msg">Loading user info...</p>;

  const totalAmount = denominations.reduce((sum, d) => sum + d * (values[`RS_${d}`] || 0), 0);
  const totalNotes = denominations.reduce((sum, d) => sum + (values[`RS_${d}`] || 0), 0);

  const handleSubmit = async () => {
    if (!user.id || !user.name) {
      toast.error('User info missing. Please log in again.');
      return;
    }

    try {
      const payload = {
        ...values,
        Employee_ID: user.id,
        Emp_Name: user.name,
        Created_By: user.name,
        Updated_By: user.name
      };
      const res = await api.post('/', payload);
      toast.success(res.data.message || 'Denomination saved successfully');
      setValues({});
    } catch (err) {
      console.error('❌ Frontend save error:', err);
      toast.error('Failed to save denomination');
    }
  };

  return (
    <div className="denomination-form">
      <div className="denomination-grid">
        {denominations.map(d => (
          <div key={d} className="denomination-row">
            <label>₹{d}</label>
            <input
              type="number"
              value={values[`RS_${d}`] || ''}
              onChange={e =>
                setValues({ ...values, [`RS_${d}`]: parseInt(e.target.value || 0) })
              }
              placeholder="Qty"
            />
          </div>
        ))}
      </div>
      <div className="denomination-summary">
        <p>Total Amount: ₹{totalAmount}</p>
        <p>Total Notes: {totalNotes}</p>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>Save Denomination</button>
      <ToastContainer />
    </div>
  );
}
