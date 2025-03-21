import React, { useEffect } from 'react';
import useToastStore from '@/stores/useToastStore';

const Toast: React.FC = () => {
  const { message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, hideToast]);

  if (!message) return null;

  let toastClass = '';

  switch (type) {
    case 'success':
      toastClass = 'bg-lime-600 text-white';
      break;
    case 'error':
      toastClass = 'bg-red-500 text-white';
      break;
    case 'info':
      toastClass = 'bg-blue-500 text-white';
      break;
    default:
      toastClass = 'bg-gray-500 text-white';
  }

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-md shadow-lg ${toastClass} transition-all transform`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={hideToast}
          className="ml-4 text-white hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
