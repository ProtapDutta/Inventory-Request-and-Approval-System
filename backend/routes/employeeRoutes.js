const express = require('express');
const router = express.Router();
const { createRequest, getMyRequests } = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

// Protected routes (only employee)
router.post('/create-request', auth, roleCheck(['employee']), createRequest);
router.get('/my-requests', auth, roleCheck(['employee']), getMyRequests);

module.exports = router;
