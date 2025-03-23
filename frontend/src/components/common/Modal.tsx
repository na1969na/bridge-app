import React from 'react';
import { useModalStore } from '../../stores/useModalStore';
import { cn } from '../../libs/utils';

interface ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  confirmButtonText: string;
  confirmButtonClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onConfirm,
  confirmButtonText,
  confirmButtonClass = 'bg-blue-600',
}) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{content}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                closeModal();
              }}
              className={cn(
                'px-4 py-2 text-white rounded-lg hover:opacity-90',
                confirmButtonClass,
              )}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
