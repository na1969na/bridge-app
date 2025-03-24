import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthToken } from './users';
import {
  fetchCheckInsByDateRange,
  createCheckIn,
  updateCheckIn,
} from '../api/checkInApi';
import { CheckIn, HealthStatus } from '../types';

// Get check-ins by date range
interface UseCheckInsByDateRangeProps {
  userId: string;
  startDate: string;
  endDate: string;
}

export const useCheckInsByDateRange = ({
  userId,
  startDate,
  endDate,
}: UseCheckInsByDateRangeProps) => {
  const { getToken, isAuthenticated } = useAuthToken();

  return useQuery({
    queryKey: ['checkIns', userId, startDate, endDate],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }

      const token = await getToken();
      const checkInData = await fetchCheckInsByDateRange(token, userId, startDate, endDate);
      return checkInData;
    },
    enabled: isAuthenticated && userId !== '',
  });
};

// Create check-in
export const useCreateCheckIn = () => {
  const { getToken, isAuthenticated } = useAuthToken();

  return useMutation({
    mutationFn: async ({ checkIn }: { checkIn: Partial<CheckIn> }) => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      const token = await getToken();
      return await createCheckIn(token, checkIn);
    },
  });
};

// Update check-in
export const useUpdateCheckIn = () => {
  const { getToken, isAuthenticated } = useAuthToken();

  return useMutation({
    mutationFn: async ({ id, healthStatus }: { id: string; healthStatus: HealthStatus }) => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      const token = await getToken();
      return await updateCheckIn(id, token, healthStatus);
    },
  });
};
