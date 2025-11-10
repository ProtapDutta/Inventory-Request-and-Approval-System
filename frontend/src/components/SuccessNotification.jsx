import React, { useEffect, useState } from 'react';

const SuccessNotification = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => setIsVisible(false), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`alert alert-success d-flex align-items-center transition-fade ${
        isLeaving ? 'fade-out' : 'fade-in'
      }`}
      role="alert"
      style={{
        animation: isLeaving ? 'fadeOut 0.3s ease-out' : 'fadeIn 0.3s ease-in',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      {/* Checkmark Animation */}
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        style={{
          width: '24px',
          height: '24px',
          animation: 'scaleIn 0.5s ease-in-out',
          flexShrink: 0
        }}
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          style={{
            animation: 'drawCheck 0.5s ease-in-out forwards',
            strokeDasharray: '24',
            strokeDashoffset: '24'
          }}
        />
      </svg>
      <span>{message}</span>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessNotification;
