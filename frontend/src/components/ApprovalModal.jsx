import React, { useState } from 'react';
import SuccessNotification from './SuccessNotification';

const ApprovalModal = ({ show, requestId, action, onConfirm, onClose }) => {
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const maxRemarkChars = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onConfirm(requestId, remark);
      
      // Show success notification and close modal
      setSuccessMessage(
        action === 'approve'
          ? 'Request approved successfully!'
          : 'Request rejected successfully!'
      );
      setShowSuccess(true);
      
      // Close modal after success shows
      setTimeout(() => {
        setRemark('');
        setShowSuccess(false);
        onClose();
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const isApprove = action === 'approve';
  const buttonClass = isApprove ? 'btn-success' : 'btn-danger';
  const title = isApprove ? 'Approve Request' : 'Reject Request';
  const remainingChars = maxRemarkChars - remark.length;

  // If showing success, display only the notification
  if (showSuccess) {
    return (
      <div
        className="modal d-block"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'block',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <SuccessNotification message={successMessage} duration={3000} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: show ? 'block' : 'none',
        zIndex: 1050
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Remark (Optional):</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={remark}
                  onChange={(e) => {
                    if (e.target.value.length <= maxRemarkChars) {
                      setRemark(e.target.value);
                    }
                  }}
                  placeholder="Add any additional notes..."
                  maxLength={maxRemarkChars}
                  disabled={loading}
                ></textarea>
                <small className="text-muted d-block mt-1">
                  {remainingChars} characters remaining
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn ${buttonClass}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  title
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
