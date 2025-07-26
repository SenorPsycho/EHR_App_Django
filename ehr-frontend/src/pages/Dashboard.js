import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ fixed import

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');
  const decoded = token ? jwtDecode(token) : null;
  const isDoctor = decoded?.role === 'doctor';

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        alert("You're not logged in!");
        navigate('/');
        return;
      }

      try {
        const patientRes = await axios.get('http://127.0.0.1:8000/api/patients/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(patientRes.data);

        const imageRes = await axios.get('http://127.0.0.1:8000/api/retinal-images/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(imageRes.data);
      } catch (err) {
        console.error('🔐 Auth error:', err.response?.data || err.message);
        alert('Not authorized');
        navigate('/');
      }
    };

    fetchData();
  }, [navigate, token]);

  const getImageForPatient = (patientId) => {
    const imageObj = images.find(img => img.patient === patientId);
    return imageObj ? `http://127.0.0.1:8000${imageObj.image}` : null;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div>
      <h2>Patients</h2>
      {isDoctor && <Link to="/add-patient"><button>Add Patient</button></Link>}
      <button onClick={handleLogout}>Logout</button>

      <ul>
        {patients.map((patient) => (
          <li key={patient.id} style={{ marginBottom: '20px' }}>
            <strong>{patient.name}</strong> — {patient.dob}
            <br />
            {getImageForPatient(patient.id) && (
              <img
                src={getImageForPatient(patient.id)}
                alt="Retinal"
                style={{ width: '150px', borderRadius: '8px', marginTop: '5px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
