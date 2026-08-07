import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const ViewContactMessages = () => {
    const [contactMessages, setContactMessages] = useState([]);

    const fetchMessages = () => {
        fetch(`${API_BASE_URL}/contact.php`)
            .then((r) => r.json())
            .then((d) => d.success && setContactMessages(d.data));
    };

    useEffect(() => { fetchMessages(); }, []);

    const onReply = async (id, rep) => {
        const r = await fetch(`${API_BASE_URL}/contact.php?action=reply`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, reply: rep }),
        });
        if ((await r.json()).success) fetchMessages();
    };

    const onDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        const r = await fetch(`${API_BASE_URL}/contact.php?action=delete`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, role: 'admin' }),
        });
        const res = await r.json();
        if (res.success) fetchMessages(); else alert(res.message);
    };

    return (
        <div>
            <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Contact Inquiries</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactMessages.length > 0 ? (
                    contactMessages.map((msg) => (
                        <div key={msg.id} className="card" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <strong style={{ color: '#1e293b' }}>{msg.name} ({msg.email})</strong>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{new Date(msg.created_at).toLocaleString()}</span>
                                    <button onClick={() => onDelete(msg.id)} className="delete-btn" title="Delete Message">Delete</button>
                                </div>
                            </div>
                            <p style={{ color: '#334155', marginTop: '0.5rem', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{msg.message}</p>

                            {msg.status === 'Replied' ? (
                                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #0284c7' }}>
                                    <strong style={{ color: '#0284c7', display: 'block', marginBottom: '0.3rem' }}>Your Reply:</strong>
                                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#1e293b' }}>{msg.reply}</p>
                                </div>
                            ) : (
                                msg.is_deleted_by_customer != 1 && (
                                    <form onSubmit={(e) => { e.preventDefault(); onReply(msg.id, e.target.elements.reply.value); }}>
                                        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                                            <textarea name="reply" className="form-control" rows="2" placeholder="Write reply to customer..." required style={{ width: '100%', padding: '0.6rem' }}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>Send Reply</button>
                                    </form>
                                )
                            )}
                        </div>
                    ))
                ) : (
                    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ color: '#64748b' }}>No contact messages received yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ViewContactMessages;
