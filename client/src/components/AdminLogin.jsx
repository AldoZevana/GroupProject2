import React, { useState } from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setAdminLoggedIn, setAdmin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { email, value } = e.target;
    setCredentials({ ...credentials, [email]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/api/adminLogin', credentials, { withCredentials: true });
      if (response.status === 200) {
        setAdminLoggedIn(true);
        setAdmin(response.data.admin);
        navigate('/admin/orders');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;