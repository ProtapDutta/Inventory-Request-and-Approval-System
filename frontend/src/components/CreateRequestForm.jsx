import React, { useState } from 'react';
import { createRequest } from '../services/api';
import SuccessNotification from './SuccessNotification';

const CreateRequestForm = ({ onRequestCreated }) => {
  const [itemName, setItemName] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const maxReasonChars = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createRequest(itemName, reason);
      setSuccess('Request created successfully!');
      setItemName('');
      setReason('');
      onRequestCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = maxReasonChars - reason.length;

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Raise New Request</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <SuccessNotification message={success} duration={3000} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name:</label>
            <input
              type="text"
              className="form-control"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Dell Laptop"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason:</label>
            <textarea
              className="form-control"
              rows="3"
              value={reason}
              onChange={(e) => {
                if (e.target.value.length <= maxReasonChars) {
                  setReason(e.target.value);
                }
              }}
              placeholder="Why do you need this item?"
              maxLength={maxReasonChars}
              required
            ></textarea>
            <small className="text-muted d-block mt-1">
              {remainingChars} characters remaining
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestForm;
