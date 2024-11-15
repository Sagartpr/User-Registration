import React, { useState } from 'react';
import axios from 'axios';


const Login = ({ setAuthenticated }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setIsDisabled(!form.email || !form.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return setMessage('Invalid email format');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form);
      setMessage(response.data.message);
      setAuthenticated(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: '55px' }}>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} style={{ marginBottom: '5px' }}
 />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{ marginBottom: '5px' }}
        />
        <button type="submit" disabled={isDisabled} style={{ marginBottom: '5px' }}>Login</button>
        <button onClick={() => setAuthenticated(false)}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
