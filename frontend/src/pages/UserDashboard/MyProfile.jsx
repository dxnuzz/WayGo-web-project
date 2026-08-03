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


     );
};

export default MyProfile;     
