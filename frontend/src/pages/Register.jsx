import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '', first_name: '', last_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.username || !form.password || !form.password2) return 'Username and password are required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.password2) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    try {
      setLoading(true); setError('');
      await register(form);
      navigate('/');
    } catch (err) {
      const d = err.response?.data;
      if (typeof d === 'object') {
        const msgs = Object.values(d).flat().join(' ');
        setError(msgs);
      } else {
        setError('Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create account</h1>
          <p>Start sharing your stories today</p>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="first_name" type="text" value={form.first_name} onChange={handleChange} placeholder="John" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="last_name" type="text" value={form.last_name} onChange={handleChange} placeholder="Doe" />
            </div>
          </div>
          <div className="form-group">
            <label>Username *</label>
            <input name="username" type="text" value={form.username} onChange={handleChange} placeholder="john_doe" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required />
          </div>
          <div className="form-group">
            <label>Confirm Password *</label>
            <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="Repeat password" required />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}