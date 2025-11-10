const Request = require('../models/Request');
const User = require('../models/User');

// Admin: View all requests from all employees
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('employeeId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ 
      total: requests.length,
      requests 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve request
exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { remark } = req.body;

    const request = await Request.findByIdAndUpdate(
      requestId,
      { 
        status: 'Approved',
        adminRemark: remark || '',
        actionDate: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ 
      message: 'Request approved',
      request 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Reject request
exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { remark } = req.body;

    const request = await Request.findByIdAndUpdate(
      requestId,
      { 
        status: 'Rejected',
        adminRemark: remark || '',
        actionDate: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ 
      message: 'Request rejected',
      request 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
