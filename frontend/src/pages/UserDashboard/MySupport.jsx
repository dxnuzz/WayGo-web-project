import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/apiConfig';

const MySupport = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [supportMessages, setSupportMessages] = useState([]);

   useEffect(() => {
    if (user) {
        //getting support messages sent by the logged-in user
      fetch(`${API_BASE_URL}/contact.php?action=getByUser&user_id=${user.user_id}`)
        .then((r) => r.json())
        .then((d) => d.success && setSupportMessages(d.data || []));
    }
  }, [user]);

  const onDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      const r = await fetch(`${API_BASE_URL}/contact.php?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: 'customer' }),
      });
      //remove deleted message without reloading the page
      if ((await r.json()).success) {
        setSupportMessages((prev) => prev.filter((m) => m.id !== id));
      }
    }
  };

    return (
        <div>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>My Support Messages</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {supportMessages.length > 0 ? (
          supportMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1.25rem',
                background: '#ffffff',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <strong style={{ color: '#1e293b' }}>Message Sent:</strong>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                  <button
                    onClick={() => onDelete(msg.id)}
                    className="delete-btn"
                    title="Delete Message"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p
                style={{
                  color: '#334155',
                  marginTop: '0.3rem',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '1rem',
                }}
              >
                {msg.message}
              </p>
                {/*show admin reply if available,otherwise show pending status*/}
              {msg.status === 'Replied' ? (
                <div
                  style={{
                    background: '#f0f9ff',
                    padding: '1rem',
                    borderRadius: '6px',
                    borderLeft: '4px solid #0284c7',
                  }}
                >
                  <strong style={{ color: '#0284c7', display: 'block', marginBottom: '0.3rem' }}>
                    Admin Response:
                  </strong>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#1e293b' }}>{msg.reply}</p>
                </div>
              ) : (
                <div
                  style={{
                    background: '#fffbeb',
                    color: '#b45309',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                  }}
                >
                  ⏳ Pending response from WayGo admin team...
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              background: '#f8fafc',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>
              You haven't submitted any inquiry messages yet.
            </p>

             {/*navigate user to contact page to submit a message*/}
            <button onClick={() => navigate('/contact')} className="btn btn-outline">
              Go to Contact Page
            </button>
          </div>
        )}
      </div>
    </div>



          );
};

export default MySupport;