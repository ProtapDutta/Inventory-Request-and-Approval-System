import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Inventory System</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            {user.name} ({user.role})
          </span>
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
