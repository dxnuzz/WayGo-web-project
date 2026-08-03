import React, { useState } from 'react';
import API_BASE_URL from '../../config/apiConfig';

const brandOptions = {
    Car: ['Toyota', 'Honda', 'Suzuki', 'Nissan', 'Other'],
    Van: ['Toyota', 'Nissan', 'Suzuki', 'Micro', 'Mitsubishi', 'Other'],
    SUV: ['Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Suzuki', 'Other'],
    Bike: ['Scooter', 'Motorcycle', 'Trail Bike'],
    'Tuk Tuk': ['Bajaj', 'TVS', 'Piaggio', 'Mahindra', 'Other'],
};

const AddVehicle = ({ isEditMode, initialData, adminId, onCancel, onComplete }) => {
    const [vehicleData, setVehicleData] = useState(initialData);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const fd = new FormData();
        Object.keys(vehicleData).forEach((k) => fd.append(k, vehicleData[k]));
        if (imageFile) fd.append('image', imageFile);
        if (!isEditMode) fd.append('admin_id', adminId);
        try {
            const r = await fetch(`${API_BASE_URL}/vehicles.php?action=${isEditMode ? 'edit' : 'add'}`, { method: 'POST', body: fd });
            const d = await r.json();
            if (d.success) onComplete(isEditMode ? 'Vehicle updated' : 'Vehicle added');
            else setError(d.message || 'Failed to save vehicle');
        } catch (err) { setError('Network error'); }
    };

    const fields = [
        { label: 'Licence', name: 'licence_number', type: 'text', req: true },
        { label: 'Model Name', name: 'vehicle_name', type: 'text', req: true },
        { label: 'Price/Day', name: 'rental_price_per_day', type: 'number', min: '0', req: true },
        { label: 'Seats', name: 'seats', type: 'number', min: '1', req: true },
        { label: 'Color', name: 'color', type: 'text', req: true }
    ];

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '1.5rem' }}>
            <h2>{isEditMode ? 'Edit Vehicle' : 'List New Vehicle'}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {fields.slice(0, 2).map((f) => (
                        <div key={f.name}>
                            <label>{f.label}</label>
                            <input type={f.type} min={f.min} name={f.name} className="form-control" value={vehicleData[f.name]} onChange={handleChange} required={f.req} />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Category</label>
                        <select name="type" className="form-control" value={vehicleData.type} onChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value, brand: brandOptions[e.target.value] ? brandOptions[e.target.value][0] : '' })}>
                            {Object.keys(brandOptions).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Brand</label>
                        <select name="brand" className="form-control" value={vehicleData.brand} onChange={handleChange} required>
                            {brandOptions[vehicleData.type]?.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    {fields.slice(2).map((f) => (
                        <div key={f.name}>
                            <label>{f.label}</label>
                            <input type={f.type} min={f.min} name={f.name} className="form-control" value={vehicleData[f.name]} onChange={handleChange} required={f.req} />
                        </div>
                    ))}
                </div>
                <div>
                    <label>Image File</label>
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" className="form-control" rows="2" value={vehicleData.description} onChange={handleChange}></textarea>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary">{isEditMode ? 'Update' : 'Add'}</button>
                    {isEditMode && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};
export default AddVehicle;
