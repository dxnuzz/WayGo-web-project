import React from 'react';
import VehicleCard from '../../components/VehicleCard';

const VehicleList = ({ vehicles }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    }}
  >
    {vehicles.length > 0 ? (
      vehicles.map((v) => <VehicleCard key={v.vehicle_id} vehicle={v} />)
    ) : (
      <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
        No matching vehicles found.
      </p>
    )}
  </div>
);

export default VehicleList;
