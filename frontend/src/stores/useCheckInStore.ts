import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CheckIn } from '../types';

interface CheckInState {
  checkIns: CheckIn[];
  setCheckIns: (checkIns: CheckIn[] | null) => void;
  updateCheckInData: (updatedCheckIn: CheckIn) => void;
}

const useCheckInStore = create<CheckInState>()(
  persist(
    (set) => ({
      checkIns: [],
      setCheckIns: (checkIns) => set({ checkIns: checkIns || [] }),
      updateCheckInData: (updatedCheckIn) => set((state) => {
        const updatedCheckIns = state.checkIns.map((checkIn) => 
          checkIn._id === updatedCheckIn._id ? updatedCheckIn : checkIn
        );
        return { checkIns: updatedCheckIns };
      }),
    }),
    
    {
      name: 'check-in-store',
    },
  ),
);

export default useCheckInStore;
