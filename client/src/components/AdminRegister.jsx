import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    if (admin.password !== admin.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/adminRegister', admin, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        alert('Registration successful');
        navigate('/adminLogin');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.err) {
        setError(err.response.data.err.message);
      } else {
        console.error(err); 
        setError('An unexpected error occurred');
      }
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rregjistrohu</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded">Rregjistrohu</button>
      </form>
    </div>
  );
};

export default AdminRegister;