import React, { ReactNode } from 'react';

interface FloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode; // Include the children property
}

const FloatingModal: React.FC<FloatingModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    zIndex: 999,
    display: isOpen ? 'block' : 'none',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={modalStyle}>
      <div style={closeButtonStyle} onClick={onClose}>
        X
      </div>
      {children}
    </div>
  );
};

export default FloatingModal;