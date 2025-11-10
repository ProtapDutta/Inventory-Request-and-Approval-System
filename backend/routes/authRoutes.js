const express = require('express');
const router = express.Router();
const { adminLogin, employeeLogin, createEmployee } = require('../controllers/authController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

// Public routes
router.post('/admin-login', adminLogin);
router.post('/employee-login', employeeLogin);

// Protected routes (only admin)
router.post('/create-employee', auth, roleCheck(['admin']), createEmployee);

module.exports = router;
