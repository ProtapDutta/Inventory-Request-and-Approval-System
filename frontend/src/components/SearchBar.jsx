import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = 'Search...' }) => (
  <div className="mb-3 position-relative" style={{ maxWidth: 350 }}>
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ paddingRight: searchTerm ? '2.5rem' : undefined }}
    />
    {searchTerm && (
      <button
        type="button"
        title="Clear search"
        onClick={() => onSearchChange('')}
        style={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'none',
          fontSize: '1.3rem',
          color: '#aaa',
          outline: 'none',
          cursor: 'pointer',
          padding: 0,
          lineHeight: 1
        }}
        tabIndex={0}
      >
        <span aria-label="Clear">&times;</span>
      </button>
    )}
  </div>
);

export default SearchBar;
