import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    contact_info: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Create patient
      const patientRes = await api.post('/patients/', formData);
      const patientId = patientRes.data.id;

      // 2. Upload image
      if (image) {
        const form = new FormData();
        form.append('patient', patientId);
        form.append('image', image);

        await api.post('/retinal-images/', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('✅ Patient and image added!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add patient or upload image');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Patient</h2>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
      <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
      <textarea name="contact_info" placeholder="Contact Info" value={formData.contact_info} onChange={handleChange} required />

      <label>Retinal Image (optional)</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <div>
          <p>Preview:</p>
          <img src={preview} alt="Retinal Preview" style={{ width: '200px', borderRadius: '8px' }} />
        </div>
      )}

      <button type="submit">Create Patient</button>
    </form>
  );
};

export default AddPatient;
