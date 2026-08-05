import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';
import StarRating from '../../components/StarRating';

const ViewFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = () => {
        fetch(`${API_BASE_URL}/feedbacks.php?action=getAll`)
            .then((r) => r.json())
            .then((d) => d.success && setFeedbacks(d.feedbacks));
    };

    useEffect(() => { fetchFeedbacks(); }, []);

    const onAction = async (action, body) => {
        const r = await fetch(`${API_BASE_URL}/feedbacks.php?action=${action}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
        if ((await r.json()).success) fetchFeedbacks();
    };

    const onToggleVisibility = (fid, st) => onAction('toggleVisibility', { feedback_id: fid, status: st });
    const onDelete = (id) => window.confirm('Delete this review?') && onAction('delete', { feedback_id: id, role: 'admin' });

    return (
        <div>
            <h2 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>Customer Reviews & Rating Approval</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Approve top customer reviews to display them publicly on the website homepage.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {feedbacks.length > 0 ? (
                    feedbacks.map((f) => (
                        <div key={f.feedback_id} className="card" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <div>
                                    <strong style={{ color: '#1e293b', fontSize: '1rem' }}>{f.f_name} {f.l_name}</strong>
                                    <span style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '0.5rem' }}>({f.email})</span>
                                </div>
                                <StarRating rating={f.rating} />
                            </div>
                            <p style={{ color: '#334155', marginTop: '0.5rem', whiteSpace: 'pre-wrap', marginBottom: '1rem', fontStyle: 'italic' }}>"{f.message}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Submitted: {new Date(f.created_at).toLocaleString()}</span>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {f.show_on_home != 1 && <button onClick={() => onDelete(f.feedback_id)} className="delete-btn">Delete</button>}
                                    <button onClick={() => onToggleVisibility(f.feedback_id, f.show_on_home ? 0 : 1)} className={f.show_on_home ? 'btn btn-danger' : 'btn btn-outline'}
                                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', background: f.show_on_home ? '#d90429' : 'transparent', color: f.show_on_home ? '#fff' : '#2563eb' }}>
                                        {f.show_on_home ? '✓ Featured on Home (Remove)' : '+ Show on Home Page'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ color: '#64748b' }}>No reviews yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ViewFeedbacks;
