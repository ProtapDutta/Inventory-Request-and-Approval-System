import axios from 'axios';

const API = axios.create({
  baseURL: 'https://inventory-backend-alpha.vercel.app/api'
});

// Add token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const adminLogin = (email, password) =>
  API.post('/auth/admin-login', { email, password });
export const employeeLogin = (email, password) =>
  API.post('/auth/employee-login', { email, password });
export const createEmployee = (name, email, password) =>
  API.post('/auth/create-employee', { name, email, password });

// Employee endpoints
export const createRequest = (itemName, reason) =>
  API.post('/employee/create-request', { itemName, reason });
export const getMyRequests = () =>
  API.get('/employee/my-requests');

// Admin endpoints
export const getAllRequests = () =>
  API.get('/admin/all-requests');
export const approveRequest = (requestId, remark) =>
  API.put(`/admin/approve/${requestId}`, { remark });
export const rejectRequest = (requestId, remark) =>
  API.put(`/admin/reject/${requestId}`, { remark });
export const getAllEmployees = () =>
  API.get('/admin/all-employees');

export default API;
