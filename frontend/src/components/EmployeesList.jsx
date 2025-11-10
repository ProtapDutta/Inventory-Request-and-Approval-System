import React from 'react';

const EmployeesList = ({ employees, currentPage, onPageChange, totalPages, searchTerm, onSearchChange }) => {
  if (employees.length === 0) {
    return <div className="alert alert-info">No employees found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      {/* Clean Search Bar for Employees */}
      {onSearchChange && (
        <div className="mb-3 position-relative" style={{ maxWidth: 350 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by employee name or email..."
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
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <strong>{emp.name}</strong>
                </td>
                <td style={{ maxWidth: '200px' }}>
                  <small>{emp.email}</small>
                </td>
                <td>
                  <span className={`badge ${emp.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                    {emp.role}
                  </span>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <small>{formatDate(emp.createdAt)}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-3">
          <ul className="pagination pagination-sm justify-content-center mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default EmployeesList;
