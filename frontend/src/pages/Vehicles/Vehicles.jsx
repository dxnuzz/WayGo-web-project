import React, { useState, useEffect, useCallback, useRef } from 'react';
import VehicleFilters from './VehicleFilters';
import VehicleList from './VehicleList';
import API_BASE_URL from '../../config/apiConfig';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    color: '',
    type: '',
    price_max: '',
    seats: '',
    availability: '',
  });
  const brandOptions = {
    Car: ['Toyota', 'Honda', 'Suzuki', 'Nissan', 'Other'],
    Van: ['Toyota', 'Nissan', 'Suzuki', 'Micro', 'Mitsubishi', 'Other'],
    SUV: ['Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Suzuki', 'Other'],
    Bike: ['Scooter', 'Motorcycle', 'Trail Bike'],
    'Tuk Tuk': ['Bajaj', 'TVS', 'Piaggio', 'Mahindra', 'Other'],
  };
  const availableBrands = filters.type ? brandOptions[filters.type] || [] : [];
  const abortControllerRef = useRef(null);

  const fetchVehicles = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`${API_BASE_URL}/vehicles.php?action=getAll&${query}`, {
        signal: abortControllerRef.current.signal,
      });
      const data = await res.json();
      if (data.success) setVehicles(data.data || []);
    } catch (err) {
      if (err.name !== 'AbortError') console.error(err);
    }
  }, [filters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <div style={{ padding: '1rem 0' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Our Vehicle Fleet</h2>
      <VehicleFilters
        filters={filters}
        setFilters={setFilters}
        onFilter={(e) => {
          e.preventDefault();
          fetchVehicles();
        }}
        availableBrands={availableBrands}
      />
      <VehicleList vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;
