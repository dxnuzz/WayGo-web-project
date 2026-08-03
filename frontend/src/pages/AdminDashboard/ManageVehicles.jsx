import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const ManageVehicles = ({ onAddClick, onEdit }) => {
    const [vehiclesList, setVehiclesList] = useState([]);

    const fetchVehicles = () => {
        fetch(`${API_BASE_URL}/vehicles.php?action=getAll`)
            .then((r) => r.json())
            .then((d) => d.success && setVehiclesList(d.data));
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const onDelete = async (id) => {
        if (window.confirm('Delete vehicle?')) {
            const r = await fetch(`${API_BASE_URL}/vehicles.php?action=delete&id=${id}`, {
                method: 'DELETE',
            });
            const d = await r.json();
            if (d.success) fetchVehicles();
        }
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}
            >
                <h2 style={{ color: '#1e293b' }}>Fleet Vehicles</h2>
                <button onClick={onAddClick} className="btn btn-primary">
                    + Add New Vehicle
                </button>
            </div>
            <div
                style={{
                    overflowX: 'auto',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem' }}>ID</th>
                            <th style={{ padding: '1rem' }}>Licence</th>
                            <th style={{ padding: '1rem' }}>Model / Brand</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Price/Day</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiclesList.map((v) => (
                            <tr key={v.vehicle_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem' }}>#{v.vehicle_id}</td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>{v.licence_number}</td>
                                <td style={{ padding: '1rem' }}>
                                    {v.vehicle_name.toLowerCase().startsWith(v.brand.toLowerCase())
                                        ? v.vehicle_name
                                        : `${v.brand} ${v.vehicle_name}`}
                                </td>
                                <td style={{ padding: '1rem' }}>{v.type}</td>
                                <td style={{ padding: '1rem' }}>
                                    Rs. {parseFloat(v.rental_price_per_day).toLocaleString()}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span
                                        style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            background: v.availability === 'Available' ? '#dcfce7' : '#fef3c7',
                                            color: v.availability === 'Available' ? '#166534' : '#92400e',
                                        }}
                                    >
                                        {v.availability}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => onEdit(v)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem', marginRight: '0.5rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(v.vehicle_id)}
                                        className="btn btn-outline"
                                        style={{
                                            padding: '0.3rem 0.7rem',
                                            fontSize: '0.85rem',
                                            borderColor: '#d90429',
                                            color: '#d90429',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageVehicles;
