import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import API from '../api';

export default function Dashboard({ token }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (!token) return;
    API.get('/subscriptions', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSubs(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // placeholder aggregated data
  const monthly = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Income', data: [500,700,650,800,900,1000], borderColor: 'green', tension: 0.3 },
      { label: 'Expense', data: [200,150,180,160,190,210], borderColor: 'red', tension: 0.3 },
    ]
  };

  const platformPie = {
    labels: ['YouTube','Patreon','Stripe','Other'],
    datasets: [{ data: [40,25,20,15], backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#AA66CC'] }]
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ maxWidth: 800 }}>
        <Line data={monthly} />
      </div>
      <div style={{ width: 400, marginTop: 20 }}>
        <Pie data={platformPie} />
      </div>

      <section>
        <h3>Your Subscriptions ({subs.length})</h3>
        <ul>
          {subs.map(s => <li key={s.id}>{s.name} — {s.amount} {s.currency} / {s.frequency}</li>)}
        </ul>
      </section>
    </div>
  );
}
