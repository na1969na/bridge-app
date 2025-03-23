import apiClient from './apiClient';
import { CheckIn } from '../types';

// Get check-ins by user
export const fetchCheckIns = async (token: string): Promise<CheckIn> => {
  try {
    const response = await apiClient.get<CheckIn>('/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await apiClient.post<CheckIn>(`/`, checkIn, {
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
  token: string,
  checkIn: Partial<CheckIn>,
): Promise<CheckIn> => {
  try {
    const response = await apiClient.put<CheckIn>(`/`, checkIn, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating check-in data:', error);
    throw error;
  }
};
