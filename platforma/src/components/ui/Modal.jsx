'use client';

import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children, hideDefaultCloseIcon = false }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={"modalOverlay"} onClick={onClose}>
      <div
        className={"modalContent"}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideDefaultCloseIcon && (
          <button className={"closeButton"} onClick={onClose}>
            ×
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
