import { User } from '../types';
import apiClient from './apiClient';

// Get (Create) user by auth0Id
export const fetchUser = async (token: string): Promise<User> => {
  try {
    const response = await apiClient.post<User>(
      '/',
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

// Update user
export const updateUser = async (
  token: string,
  user: Partial<User>,
): Promise<User> => {
  try {
    const response = await apiClient.put<User>(`/`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (token: string): Promise<void> => {
  try {
    await apiClient.delete(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
