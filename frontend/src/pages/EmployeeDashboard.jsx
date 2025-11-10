import React, { useState, useEffect } from 'react';
import CreateRequestForm from '../components/CreateRequestForm';
import RequestTable from '../components/RequestTable';
import { getMyRequests } from '../services/api';

const EmployeeDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await getMyRequests();
      setRequests(response.data.requests);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid mt-5 px-4">
      <h2 className="mb-4">Employee Dashboard</h2>

      <div className="row">
        {/* LEFT SIDE: Create Request Form - Smaller Width */}
        <div className="col-md-3">
          <CreateRequestForm onRequestCreated={fetchRequests} />
        </div>

        {/* RIGHT SIDE: My Requests - Larger Width */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Requests ({requests.length})</h5>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <RequestTable
                  requests={paginatedRequests}
                  isAdmin={false}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
