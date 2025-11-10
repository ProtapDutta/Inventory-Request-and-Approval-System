import React from 'react';

const NavPanel = ({ activeView, onViewChange }) => {
  return (
    <div className="card mt-3">
      <div className="card-header bg-info text-white">
        <h6 className="mb-0">Navigation</h6>
      </div>
      <div className="card-body">
        <div className="d-grid gap-2">
          <button
            className={`btn ${activeView === 'requests' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onViewChange('requests')}
          >
            📋 All Requests
          </button>
          <button
            className={`btn ${activeView === 'employees' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => onViewChange('employees')}
          >
            👥 All Employees
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavPanel;
