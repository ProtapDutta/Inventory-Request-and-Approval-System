const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getAllRequests, approveRequest, rejectRequest } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

// Get all requests
router.get('/all-requests', auth, roleCheck(['admin']), getAllRequests);

// Approve request
router.put('/approve/:requestId', auth, roleCheck(['admin']), approveRequest);

// Reject request
router.put('/reject/:requestId', auth, roleCheck(['admin']), rejectRequest);

// Get all employees
router.get('/all-employees', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const users = await User.find({ role: 'employee' }).select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
