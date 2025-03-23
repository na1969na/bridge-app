import React, { useEffect } from 'react';
import useToastStore from '../../stores/useToastStore';
import { cn } from '../../libs/utils';

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

  return (
    <div
      className={cn(
        'fixed top-5 right-5 p-4 rounded-md shadow-lg transition-all transform',
        {
          'bg-lime-600 text-white': type === 'success',
          'bg-red-500 text-white': type === 'error',
          'bg-blue-500 text-white': type === 'info',
          'bg-gray-500 text-white': !type,
        },
      )}
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
