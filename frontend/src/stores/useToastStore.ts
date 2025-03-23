import { create } from 'zustand';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info' | null;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: null,
  showToast: (message, type) => set({ message, type }),
  hideToast: () => set({ message: '', type: null }),
}));

export default useToastStore;
