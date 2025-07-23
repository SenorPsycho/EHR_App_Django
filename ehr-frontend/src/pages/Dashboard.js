import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        alert("You're not logged in!");
        return;
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/api/patients/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPatients(res.data);
      } catch (err) {
        console.error('🔐 Auth error:', err.response?.data || err.message);
        alert('Not authorized');
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
