const Request = require('../models/Request');
const User = require('../models/User');

// Employee: Create new request
exports.createRequest = async (req, res) => {
  try {
    const { itemName, reason, requestDate } = req.body;

    if (!itemName || !reason) {
      return res.status(400).json({ message: 'Please provide item name and reason' });
    }

    const request = await Request.create({
      employeeId: req.user.id,
      itemName,
      reason,
      requestDate: requestDate || new Date(),
      status: 'Pending'
    });

    res.status(201).json({ 
      message: 'Request created successfully',
      request 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employee: View own requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
    
    res.json({ 
      total: requests.length,
      requests 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
