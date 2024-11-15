import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = ({ setRegistered }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', profession: '', phoneNumber: '' });
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const isFormValid = form.name && form.email && form.password && form.profession && form.phoneNumber;
    setIsDisabled(!isFormValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,10}$/;

    if (!emailPattern.test(form.email)) return setMessage('Invalid email format');
    if (!phonePattern.test(form.phoneNumber)) return setMessage('Phone number must be 10 digits');
    if (!passwordPattern.test(form.password)) return setMessage('Password must be 8-10 chars with a special character');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      setMessage(response.data.message);
      setRegistered(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: '55px' }}>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input-gap" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange}  className="input-gap" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}  className="input-gap" />
        <input type="text" name="profession" placeholder="Profession" onChange={handleChange} className="input-gap"  />
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="input-gap"  />
        <button type="submit" disabled={isDisabled}style={{ marginBottom: '5px' }}>Register</button>
        <button onClick={() => setRegistered(false)}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
