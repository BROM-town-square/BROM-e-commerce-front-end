import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(prev => !prev);
    setError('');
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { username, email, password } = formData;
    if (!username || !password || (isRegister && !email)) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateInputs()) return;

    const endpoint = isRegister ? '/api/auth/admin/register' : '/api/auth/admin/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (!isRegister) {
        localStorage.setItem('adminToken', data.access_token);
        navigate('/Admin');
      } else {
        setError('Registration successful! You can now log in.');
        setIsRegister(false);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="admin-auth">
      <h2>{isRegister ? 'Admin Register' : 'Admin Login'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {isRegister && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="auth-toggle">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button className="auth-switch" onClick={toggleMode}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default AdminAuth;
