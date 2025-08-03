import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Add this at the top

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const linkStyle = {
  color: '#28a745',
  textDecoration: 'underline',
  cursor: 'pointer'
};

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token); // ✅ Save JWT to localStorage
      setMessage('Login successful');
      window.location.href = '/'; // ✅ Redirect to home or task list after login
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Login</h2>
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
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
      <button type="submit" style={buttonStyle}>Login</button>
<p>
  Don’t have an account?{' '}
  <Link to="/register" style={linkStyle}>Register here</Link>
</p>
      <p>{message}</p>
    </form>
  );
}

// Just some quick styles:
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
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Login;