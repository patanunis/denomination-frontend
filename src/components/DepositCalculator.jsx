// DepositCalculator.jsx
import { useState } from 'react';
import axios from 'axios';

export default function DepositCalculator() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);

  const fetchDeposit = async () => {
    const res = await axios.get(`/api/denomination/deposit?from=${from}&to=${to}`);
    setResult(res.data);
  };

  return (
    <div>
      <input type="datetime-local" onChange={e => setFrom(e.target.value)} />
      <input type="datetime-local" onChange={e => setTo(e.target.value)} />
      <button onClick={fetchDeposit}>Calculate</button>
      {result && (
        <div>
          <p>Total Amount: ₹{result.totalAmount}</p>
          <p>Rounded Amount: ₹{result.roundedAmount}</p>
          <p>Combo: RS_500 = {result.combo.RS_500}, RS_200 = {result.combo.RS_200}, RS_100 = {result.combo.RS_100}</p>
        </div>
      )}
    </div>
  );
}
