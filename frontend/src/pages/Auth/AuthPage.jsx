import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import API_BASE_URL from '../../config/apiConfig';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    f_name: '',
    l_name: '',
    phone_number: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}/auth.php?action=${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        if (isLogin) {
          login({ user_id: data.user_id, email: data.email, role: data.role });
          navigate(data.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
        } else {
          setSuccess('Registration successful! Please login.');
          setIsLogin(true);
          setFormData({ email: '', password: '', f_name: '', l_name: '', phone_number: '' });
        }
      } else setError(data.message);
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      ) : (
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      )}
      <p className="auth-toggle">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setSuccess('');
          }}
        >
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
