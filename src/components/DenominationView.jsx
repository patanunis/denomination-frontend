// DenominationView.jsx
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function DenominationView() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`/api/denomination/view?from=${from}&to=${to}`);
    setEntries(res.data.entries);
  };

  const summary = entries.reduce((acc, e) => {
    acc.amount += e.Total_Amount;
    acc.notes += e.Total_Number_of_Notes;
    return acc;
  }, { amount: 0, notes: 0 });

  return (
    <div>
      <input type="datetime-local" onChange={e => setFrom(e.target.value)} />
      <input type="datetime-local" onChange={e => setTo(e.target.value)} />
      <button onClick={fetchData}>Fetch</button>
      <table>
        <thead><tr>{/* headers */}</tr></thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{e.RS_500}</td>
              <td>{e.Emp_Name}</td>
              <td>{moment(e.Created_On).format('DD-MM-YYYY HH:mm')}</td>
              {/* more fields */}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Amount: ₹{summary.amount}</p>
      <p>Total Notes: {summary.notes}</p>
    </div>
  );
}
