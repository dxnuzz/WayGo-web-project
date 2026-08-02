import React from 'react';

const LoginForm = ({ formData, handleChange, handleSubmit, error, success }) => (
  <div className="card" style={{ padding: '2.5rem', textAlign: 'left' }}>
    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
      Login to WayGo
    </h2>

    {error && <div className="alert alert-error">{error}</div>}
    {success && <div className="alert alert-success">{success}</div>}

    <form onSubmit={handleSubmit}>
      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', padding: '0.75rem' }}
      >
        Login
      </button>
    </form>
  </div>
);

export default LoginForm;