import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, error, success }) => (
  <div className="card" style={{ padding: '2.5rem', textAlign: 'left' }}>
    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
    {error && <div className="alert alert-error">{error}</div>}
    {success && <div className="alert alert-success">{success}</div>}
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>First Name</label>
          <input
            type="text"
            name="f_name"
            className="form-control"
            placeholder="John"
            value={formData.f_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>Last Name</label>
          <input
            type="text"
            name="l_name"
            className="form-control"
            placeholder="Doe"
            value={formData.l_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
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
      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          className="form-control"
          pattern="[0-9]{10}"
          title="10-digit number"
          placeholder="0712345678"
          value={formData.phone_number}
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
          minLength="6"
          placeholder="At least 6 characters"
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
        Register
      </button>
    </form>
  </div>
);

export default RegisterForm;
