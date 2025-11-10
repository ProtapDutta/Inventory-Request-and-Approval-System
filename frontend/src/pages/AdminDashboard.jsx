import React, { useState, useEffect } from 'react';
import CreateEmployeeForm from '../components/CreateEmployeeForm';
import NavPanel from '../components/NavPanel';
import SearchBar from '../components/SearchBar';
import RequestTable from '../components/RequestTable';
import EmployeesList from '../components/EmployeesList';
import ApprovalModal from '../components/ApprovalModal';
import { getAllRequests, approveRequest, rejectRequest, getAllEmployees } from '../services/api';

const AdminDashboard = () => {
  // Requests state
  const [requests, setRequests] = useState([]);
  const [requestSearchTerm, setRequestSearchTerm] = useState('');
  const [requestPage, setRequestPage] = useState(1);
  const requestsPerPage = 5;

  // Employees state
  const [employees, setEmployees] = useState([]);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employeePage, setEmployeePage] = useState(1);
  const employeesPerPage = 10;

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('requests');
  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const response = await getAllRequests();
      setRequests(response.data.requests);
      setRequestPage(1);
    } catch (err) {
      setError('Failed to load requests');
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data.users);
      setEmployeePage(1);
    } catch (err) {
      setError('Failed to load employees');
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchRequests();
      await fetchEmployees();
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter requests based on search
  const filteredRequests = requests.filter((req) => {
    const search = requestSearchTerm.toLowerCase();
    return (
      req.itemName.toLowerCase().includes(search) ||
      req.reason.toLowerCase().includes(search) ||
      req.employeeId?.name.toLowerCase().includes(search) ||
      req.employeeId?.email.toLowerCase().includes(search)
    );
  });

  // Filter employees based on search
  const filteredEmployees = employees.filter((emp) => {
    const search = employeeSearchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
    );
  });

  // Calculate pagination for requests
  const totalRequestPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const requestStartIndex = (requestPage - 1) * requestsPerPage;
  const paginatedRequests = filteredRequests.slice(
    requestStartIndex,
    requestStartIndex + requestsPerPage
  );

  // Calculate pagination for employees
  const totalEmployeePages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const employeeStartIndex = (employeePage - 1) * employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    employeeStartIndex,
    employeeStartIndex + employeesPerPage
  );

  // Modal handlers
  const handleApproveClick = (requestId) => {
    setSelectedRequestId(requestId);
    setModalAction('approve');
    setModalShow(true);
  };

  const handleRejectClick = (requestId) => {
    setSelectedRequestId(requestId);
    setModalAction('reject');
    setModalShow(true);
  };

  const handleConfirmAction = async (requestId, remark) => {
    try {
      if (modalAction === 'approve') {
        await approveRequest(requestId, remark);
      } else {
        await rejectRequest(requestId, remark);
      }
      await fetchRequests();
    } catch (err) {
      setError('Failed to ' + modalAction + ' request');
    }
  };

  return (
    <div className="container-fluid mt-4 px-3">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-3">
        {/* LEFT SIDE: Create Employee Form + Navigation - Fixed Width */}
        <div className="col-lg-3">
          <div style={{ position: 'sticky', top: '20px' }}>
            <CreateEmployeeForm onEmployeeCreated={fetchEmployees} />
            <NavPanel activeView={activeView} onViewChange={setActiveView} />
          </div>
        </div>

        {/* RIGHT SIDE: Dynamic Content (Requests or Employees) - Takes Remaining Space */}
        <div className="col-lg-9">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                {activeView === 'requests'
                  ? `All Requests (${filteredRequests.length})`
                  : `All Employees (${filteredEmployees.length})`}
              </h5>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', minHeight: '400px' }}>
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : activeView === 'requests' ? (
                <>
                  <SearchBar 
                    searchTerm={requestSearchTerm} 
                    onSearchChange={setRequestSearchTerm}
                    placeholder="Search by employee name, item, or reason..."
                  />
                  <RequestTable
                    requests={paginatedRequests}
                    onApprove={handleApproveClick}
                    onReject={handleRejectClick}
                    isAdmin={true}
                    currentPage={requestPage}
                    onPageChange={setRequestPage}
                    totalPages={totalRequestPages}
                  />
                </>
              ) : (
                <EmployeesList
                  employees={paginatedEmployees}
                  currentPage={employeePage}
                  onPageChange={setEmployeePage}
                  totalPages={totalEmployeePages}
                  searchTerm={employeeSearchTerm}
                  onSearchChange={setEmployeeSearchTerm}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approval/Rejection Modal with Success Notification Inside */}
      <ApprovalModal
        show={modalShow}
        requestId={selectedRequestId}
        action={modalAction}
        onConfirm={handleConfirmAction}
        onClose={() => setModalShow(false)}
      />
    </div>
  );
};

export default AdminDashboard;
