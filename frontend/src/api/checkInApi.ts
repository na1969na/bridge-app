import apiClient from './apiClient';
import { CheckIn, HealthStatus } from '../types';

// Get check-ins by date range
export const fetchCheckInsByDateRange = async (
  token: string,
  userId: string,
  startDate: string,
  endDate: string,
): Promise<CheckIn[]> => {
  try {
    const response = await apiClient.get<CheckIn[]>(
      `/checkins?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching check-in data:', error);
    throw error;
  }
};

// Create check-in
export const createCheckIn = async (
  token: string,
  checkIn: Partial<CheckIn>,
): Promise<CheckIn> => {
  try {
    const response = await apiClient.post<CheckIn>(`/checkins`, checkIn, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating check-in data:', error);
    throw error;
  }
};

// Update check-in
export const updateCheckIn = async (
  id: string,
  token: string,
  healthStatus: HealthStatus,
): Promise<CheckIn> => {
  try {
    const response = await apiClient.put<CheckIn>(
      `/checkins/${id}`,
      { healthStatus: healthStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating check-in data:', error);
    throw error;
  }
};
