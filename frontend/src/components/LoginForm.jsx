import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { adminLogin, employeeLogin } from '../services/api';

const LoginForm = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!role) {
      setError('Please select a role');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let response;
      if (role === 'admin') {
        response = await adminLogin(email, password);
      } else {
        response = await employeeLogin(email, password);
      }

      login(response.data.user, response.data.token);
      setCurrentPage(role === 'admin' ? 'admin-dashboard' : 'employee-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4 fw-bold">Inventory System</h2>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Role Selection */}
            <div className="mb-3">
              <label htmlFor="roleSelect" className="form-label fw-semibold">
                Login as:
              </label>
              <select
                id="roleSelect"
                className="form-select form-select-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ zIndex: 1000 }}
              >
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fw-semibold">
                Email:
              </label>
              <input
                id="emailInput"
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="passwordInput" className="form-label fw-semibold">
                Password:
              </label>
              <input
                id="passwordInput"
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <hr className="my-4" />

          {/* Demo Credentials */}
          <div className="alert alert-info" role="alert">
            <h6 className="fw-bold mb-2">📋 Demo Credentials:</h6>
            <small className="d-block mb-1">
              <strong>Admin:</strong> admin@gmail.com / admin123
            </small>
            <small className="d-block">
              <strong>Employee:</strong> pro@gmail.com / pro123
            </small>
          </div>
        </div>
      </div>

      <style>{`
        /* Ensure dropdown stays visible on mobile */
        @media (max-width: 576px) {
          .form-select {
            font-size: 16px !important;
            padding: 0.75rem !important;
            border: 2px solid #dee2e6 !important;
          }

          .form-select:focus {
            border-color: #0d6efd !important;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
          }

          .form-control {
            font-size: 16px !important;
          }

          .card {
            border-radius: 12px !important;
          }
        }

        /* Desktop styling */
        @media (min-width: 577px) {
          .form-select,
          .form-control {
            font-size: 15px;
            border-radius: 6px;
            border: 1px solid #dee2e6;
          }

          .form-select:hover,
          .form-control:hover {
            border-color: #adb5bd;
          }

          .form-select:focus,
          .form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          }
        }

        /* Dropdown option styling */
        .form-select option {
          padding: 8px 12px;
          line-height: 1.5;
        }

        /* Button hover effect */
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.4);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
