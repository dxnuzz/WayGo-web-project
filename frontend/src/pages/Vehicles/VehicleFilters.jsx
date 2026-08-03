import React from 'react';

const VehicleFilters = ({ filters, setFilters, onFilter, availableBrands }) => {
  const handleChange = (e, field) => {
    let val = e.target.value;
    if (field === 'type') setFilters({ ...filters, type: val, brand: '' });
    else setFilters({ ...filters, [field]: val });
  };
  const preventNeg = (e) => ['-', 'e', 'E'].includes(e.key) && e.preventDefault();

  return (
    <div
      className="card"
      style={{
        background: '#f8fafc',
        padding: '1.25rem',
        borderRadius: '12px',
        marginBottom: '2rem',
      }}
    >
      <form
        onSubmit={onFilter}
        style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}
      >
        <div style={{ flex: '1 1 130px' }}>
          <label>Type</label>
          <select
            className="form-control"
            value={filters.type}
            onChange={(e) => handleChange(e, 'type')}
            style={{ width: '100%', padding: '0.4rem' }}
          >
            <option value="">All</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="SUV">SUV</option>
            <option value="Bike">Bike</option>
            <option value="Tuk Tuk">Tuk Tuk</option>
          </select>
        </div>
        <div style={{ flex: '1 1 130px' }}>
          <label>Brand</label>
          <select
            className="form-control"
            value={filters.brand}
            onChange={(e) => handleChange(e, 'brand')}
            disabled={!filters.type}
            style={{ width: '100%', padding: '0.4rem' }}
          >
            <option value="">All</option>
            {availableBrands.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: '1 1 130px' }}>
          <label>Color</label>
          <select
            className="form-control"
            value={filters.color}
            onChange={(e) => handleChange(e, 'color')}
            style={{ width: '100%', padding: '0.4rem' }}
          >
            <option value="">All</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Orange">Orange</option>
            <option value="Beige">Beige</option>
            <option value="Maroon">Maroon</option>
            <option value="Grey">Grey</option>
            <option value="Yellow">Yellow</option>
            <option value="Pink">Pink</option>
          </select>
        </div>
        <div style={{ flex: '1 1 130px' }}>
          <label>Max Price</label>
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="15000"
            value={filters.price_max}
            onChange={(e) =>
              (e.target.value === '' || Number(e.target.value) >= 0) && handleChange(e, 'price_max')
            }
            onKeyDown={preventNeg}
            style={{ width: '100%', padding: '0.4rem' }}
          />
        </div>
        <div style={{ flex: '1 1 130px' }}>
          <label>Seats</label>
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="5"
            value={filters.seats}
            onChange={(e) =>
              (e.target.value === '' || Number(e.target.value) >= 0) && handleChange(e, 'seats')
            }
            onKeyDown={preventNeg}
            style={{ width: '100%', padding: '0.4rem' }}
          />
        </div>
        <div style={{ flex: '1 1 130px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.5rem', cursor: 'pointer' }}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleFilters;
