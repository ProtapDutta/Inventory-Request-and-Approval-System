import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';

function App() {
  const { user, loading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = React.useState('login');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm setCurrentPage={setCurrentPage} />;
  }

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
}

export default App;
