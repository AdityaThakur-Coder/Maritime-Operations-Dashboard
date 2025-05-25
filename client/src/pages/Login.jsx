import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Anchor } from 'lucide-react';
import './Login.css';  // import your CSS

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Anchor size={48} />
        </div>
        <h2 className="login-title">Maritime Operations Dashboard</h2>
        <form onSubmit={onSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="user@example.com"
            required
          />
          <label htmlFor="password" style={{ marginTop: '18px' }}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="••••••••"
            required
          />
          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting}
            style={{ marginTop: '30px' }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="login-footer">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
