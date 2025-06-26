import React, { useState } from 'react';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    const url = `https://brom-e-commerce-backend.onrender.com/api/auth/user/${endpoint}`;

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || 'Authentication failed.');
        return;
      }

      if (isLogin) {
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userRole', 'user');
        alert('Login successful!');
        window.location.href = '/menu'; 
      } else {
        alert('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert('An error occurred.');
    }
  };

  return (
    <div className="user-auth">
      <h2>{isLogin ? 'User Login' : 'User Registration'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p onClick={toggleForm}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default UserAuth;
