import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import API_BASE_URL from '../../config/apiConfig';

const MyProfile = ({setGlobalMessage, setGlobalError}) =>{
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    f_name: '',
    l_name: '',
    phone_number: '',
    password: '',
  });

  useEffect(() =>{
    //load user profile details
    if (user) {
      fetch(`${API_BASE_URL}/auth.php?action=getProfile&user_id=${user.user_id}`)
        .then((r) => r.json())
        .then((d) => d.success && d.data && setProfile({ ...d.data, password: '' }));
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    //update profile info
    const r = await fetch(`${API_BASE_URL}/auth.php?action=updateProfile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile, user_id: user.user_id }),
    });
    const d = await r.json();
    if (d.success) {
      setGlobalMessage('Profile updated');
      setGlobalError('');
    } else {
      setGlobalError(d.message);
      setGlobalMessage('');
    }
  };

    return (
        <div style={{ maxWidth: '480px' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>My Account Profile</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.f_name || ''}
            onChange={(e) => setProfile({ ...profile, f_name: e.target.value })}
            required
            style={{ width: '100%', padding: '0.6rem' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.l_name || ''}
            onChange={(e) => setProfile({ ...profile, l_name: e.target.value })}
            required
            style={{ width: '100%', padding: '0.6rem' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            placeholder="0771234567"
            pattern="[0-9]{10}"
            title="10-digit phone number"
            minLength="10"
            maxLength="10"
            value={profile.phone_number || ''}
            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
            required
            style={{ width: '100%', padding: '0.6rem' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
            New Password (optional)
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Leave blank to keep current"
            value={profile.password || ''}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            style={{ width: '100%', padding: '0.6rem' }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', cursor: 'pointer' }}
        >
          Update Profile
        </button>
      </form>
    </div>

     );
};

export default MyProfile;     
