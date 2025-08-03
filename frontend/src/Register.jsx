import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async e => {
  e.preventDefault();

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    setMessage('Please enter a valid email address');
    return;
  }

  try {
    const res = await axios.post('http://localhost:8080/register', form);
    setMessage(res.data.message);
    window.location.href = '/'; // ✅ Redirect after successful registration
  } catch (err) {
    setMessage(err.response?.data?.error || 'Something went wrong');
  }
};

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Register</h2>
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        required
        style={inputStyle}
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Register</button>
      <p>
        Already have an account?{' '}
        <Link to="/login" style={linkStyle}>Login here</Link>
      </p>
      <p>{message}</p>
    </form>
  );
}

// Reusing same styling from Login page
const formStyle = {
  maxWidth: '400px',
  margin: '100px auto',
  padding: '2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'underline',
  cursor: 'pointer'
};

export default Register;