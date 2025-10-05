// DenominationForm.jsx
import { useState } from 'react';
import { useAuth } from '../context';
import axios from 'axios';

const denominations = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

export default function DenominationForm() {
  const { user } = useAuth();
  const [values, setValues] = useState({});
  const totalAmount = denominations.reduce((sum, d) => sum + d * (values[`RS_${d}`] || 0), 0);
  const totalNotes = denominations.reduce((sum, d) => sum + (values[`RS_${d}`] || 0), 0);

  const handleSubmit = async () => {
    const payload = {
      ...values,
      Employee_ID: user.id,
      Emp_Name: user.name,
      Created_By: user.name,
      Updated_By: user.name,
    };
    await axios.post('/api/denomination/create', payload);
  };

  return (
    <div>
      {denominations.map(d => (
        <div key={d}>
          <label>RS_{d}</label>
          <input type="number" onChange={e => setValues({ ...values, [`RS_${d}`]: parseInt(e.target.value || 0) })} />
        </div>
      ))}
      <p>Total Amount: ₹{totalAmount}</p>
      <p>Total Notes: {totalNotes}</p>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
