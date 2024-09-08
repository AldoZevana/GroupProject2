import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import image from '../assets/image.png';
const Auth = ({ setLoggedIn, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const url = isLogin ? 'http://localhost:8000/api/login' : 'http://localhost:8000/api/register';
    const data = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const response = await axios.post(url, data, { withCredentials: true });
      if (response.status === 200 || response.status === 201) {
  
        setLoggedIn(true);
        setUser(response.data.user);
        navigate('/menu');
      } else {
        setError(`${isLogin ? 'Login' : 'Registration'} failed`);
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
    <div className="auth-container">
      <div className="auth-content">
        <div className={`auth-form ${isLogin ? 'login-active' : 'register-active'}`}>
          <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="form-content">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="input-field"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="input-field"
              />
            )}
            <button type="submit" className="submit-button">
              {isLogin ? 'Logohu' : 'Rregjistrohu'}
            </button>
          </form>
        </div>
        <div className={`auth-toggle-container ${isLogin ? 'toggle-left' : 'toggle-right'}`}>
        <div><img src={image} alt="logo" className="logo" /> </div>
        <div id='dflex'><p id='pyetje' onClick={() => setIsLogin(!isLogin)} >
            {isLogin ?  'Nuk e ke nje llogari? ' : 'E ke tashme nje llogari? '}
          </p>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ?  ' Rregjistrohu' : ' Logohu'}
          </button></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;