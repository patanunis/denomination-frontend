import { useState } from 'react';
import api from '../apis';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const denominations = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

export default function DenominationView() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({ Total_Amount: 0, Total_Notes: 0 });

  const fetchData = async () => {
    try {
      const res = await api.get(`/?from=${from}&to=${to}`);
      setEntries(res.data.entries);
      setSummary(res.data.summary);
    } catch (err) {
      console.error('❌ Frontend fetch error:', err);
      toast.error('Failed to fetch denominations');
    }
  };

  return (
    <div>
      <label>From</label>
      <input type="datetime-local" onChange={e => setFrom(e.target.value)} />
      <label>To</label>
      <input type="datetime-local" onChange={e => setTo(e.target.value)} />
      <button onClick={fetchData}>Fetch</button>

      <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            {denominations.map(d => (
              <th key={d}>RS_{d}</th>
            ))}
            <th>Total Amount</th>
            <th>Total Notes</th>
            <th>Emp Name</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{e._id}</td>
              {denominations.map(d => (
                <td key={d}>{e[`RS_${d}`]}</td>
              ))}
              <td>{e.Total_Amount}</td>
              <td>{e.Total_Number_of_Notes}</td>
              <td>{e.Emp_Name}</td>
              <td>{moment(e.Created_On).format('DD-MM-YYYY HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Amount: ₹{summary.Total_Amount}</p>
      <p>Total Notes: {summary.Total_Notes}</p>
      <ToastContainer />
    </div>
  );
}
