import React, { useState, useEffect } from 'react';
import api from '../apis';
import '../styles/ViewDenomination.css';

export default function ViewDenomination() {
  const [totals, setTotals] = useState({ totalAmount: 0, totalNotes: 0, summary: {} });
  const [fromDate, setFromDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [showSummary, setShowSummary] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [depositResult, setDepositResult] = useState(null);
  const [hasCalculatedDeposit, setHasCalculatedDeposit] = useState(false);
  const token = localStorage.getItem('token');

  const handleFetchClick = () => {
    setHasFetchedOnce(true);
    setDepositResult(null); // Clear deposit summary on new fetch
  };

  const handleDepositCalculation = async () => {
    const fromISO = new Date(fromDate).toISOString().split('T')[0] + 'T00:00:00.000Z';
    const toISO = new Date(toDate).toISOString().split('T')[0] + 'T23:59:59.999Z';
    try {
      const res = await api.post(`/denomination/deposit?from=${fromISO}&to=${toISO}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepositResult(res.data);
      setHasCalculatedDeposit(true);
    } catch (err) {
      console.error('❌ Deposit calculation failed:', err);
      setDepositResult(null);
    }
  };

  useEffect(() => {
    if (!hasFetchedOnce) return;

    const fromISO = new Date(fromDate).toISOString().split('T')[0] + 'T00:00:00.000Z';
    const toISO = new Date(toDate).toISOString().split('T')[0] + 'T23:59:59.999Z';

    (async () => {
      try {
        const resView = await api.get(`/denomination?from=${fromISO}&to=${toISO}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = resView.data.entries || [];
        let totalAmount = 0;
        let totalNotes = 0;
        const summary = {
          RS_2000: 0, RS_500: 0, RS_200: 0, RS_100: 0,
          RS_50: 0, RS_20: 0, RS_10: 0, RS_5: 0,
          RS_2: 0, RS_1: 0
        };

        data.forEach(entry => {
          Object.keys(summary).forEach(key => {
            summary[key] += parseInt(entry[key]) || 0;
          });
          totalAmount += entry.Total_Amount || 0;
          totalNotes += entry.Total_Number_of_Notes || 0;
        });

        setTotals({ totalAmount, totalNotes, summary });
        setShowSummary(true);

        if (hasCalculatedDeposit) {
          const resDeposit = await api.post(`/denomination/deposit?from=${fromISO}&to=${toISO}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setDepositResult(resDeposit.data);
        }
      } catch (err) {
        console.error('❌ Error during auto-refresh:', err);
      }
    })();
  }, [fromDate, toDate, hasFetchedOnce, hasCalculatedDeposit, token]);

  return (
    <div className="view-bg">
      <div className="view-container">
        <h2>View Denomination</h2>

        <div className="filter-row">
          <div className="filter-group">
            <label>From</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>To</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <button onClick={handleFetchClick}>Fetch</button>
          </div>
        </div>

        {showSummary && (
          <>
            <table className="denom-table">
              <thead>
                <tr>
                  <th>Denomination (₹)</th>
                  <th>Quantity</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(totals.summary).map(([key, quantity]) => {
                  const value = parseInt(key.replace('RS_', ''));
                  const amount = quantity * value;
                  return (
                    <tr key={key}>
                      <td>{`₹${value}`}</td>
                      <td>{quantity}</td>
                      <td>{amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="summary-row">
              <div>Total Notes: {totals.totalNotes}</div>
              <div>Grand Total: ₹{totals.totalAmount}</div>
            </div>

            {!hasCalculatedDeposit && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={handleDepositCalculation}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Calculate Denomination Deposit
                </button>
              </div>
            )}
          </>
        )}

        {depositResult && (
          <>
            <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Deposit Summary</h2>
            <table className="denom-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Denomination</th>
                  <th>Quantity</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {depositResult.combo?.map((item, index) => {
                  const [denom, qty] = item.split('×').map(s => s.trim());
                  return (
                    <tr key={`combo-${index}`}>
                      <td>Combo</td>
                      <td>{`₹${denom.replace('RS_', '')}`}</td>
                      <td>{qty}</td>
                      <td>{parseInt(denom.replace('RS_', '')) * parseInt(qty)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="summary-row" style={{ flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Total Notes: {depositResult.totalNotes}</div>
                <div>Total Amount: ₹{depositResult.totalAmount}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Remaining Breakdown: {depositResult.remainingBreakdown?.join(', ').replace(/RS_/g, '₹')}</div>
                <div>Remaining Notes: {depositResult.remainingNotes}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Rounded Amount: ₹{depositResult.roundedAmount}</div>
                <div>Remaining Amount: ₹{depositResult.remainingAmount}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
