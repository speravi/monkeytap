import React, { useEffect } from "react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Prevent clicks inside the modal content from closing it via the overlay
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-elementBg p-6 rounded-md shadow-xl w-full max-w-md text-text"
        onClick={handleModalContentClick}
      >
        <p className="text-xl font-semibold mb-2">{title}</p>
        <p className="text-base mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded transition-colors bg-inactive hover:bg-gray-600 text-text"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="px-4 py-2 rounded transition-colors bg-red-500 hover:bg-red-600 text-white"
            onClick={handleConfirm}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
