import apiClient from './apiClient';
import { UserResponse } from '@/types/user';

export const fetchUserData = async (token: string): Promise<UserResponse> => {
  try {
    const response = await apiClient.post<UserResponse>(
      '/users',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
