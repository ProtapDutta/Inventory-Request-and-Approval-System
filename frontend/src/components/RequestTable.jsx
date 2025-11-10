import React from 'react';

const RequestTable = ({ requests, onApprove, onReject, isAdmin, currentPage, onPageChange, totalPages }) => {
  if (requests.length === 0) {
    return <div className="alert alert-info">No requests found</div>;
  }

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm">
          <thead className="table-dark">
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Item Name</th>
              <th>Reason</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Admin Remark</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                {isAdmin && (
                  <td>
                    <strong>{req.employeeId?.name}</strong><br />
                    <small className="text-muted">{req.employeeId?.email}</small>
                  </td>
                )}
                <td style={{ maxWidth: '120px' }}>
                  <small>{req.itemName}</small>
                </td>
                <td style={{ maxWidth: '150px' }}>
                  <small>{req.reason}</small>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <small>{formatDate(req.createdAt)}</small>
                </td>
                <td>
                  <span
                    className={`badge ${
                      req.status === 'Approved'
                        ? 'bg-success'
                        : req.status === 'Rejected'
                        ? 'bg-danger'
                        : 'bg-warning'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td style={{ maxWidth: '120px' }}>
                  <small>{req.adminRemark || '-'}</small>
                </td>
                {isAdmin && (
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {req.status === 'Pending' ? (
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => onApprove(req._id)}
                          title="Approve this request"
                        >
                          ✓ Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onReject(req._id)}
                          title="Reject this request"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    ) : (
                      <small className="text-muted">
                        Done {formatDate(req.actionDate)}
                      </small>
                    )}
                  </td>
                )}
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

export default RequestTable;
