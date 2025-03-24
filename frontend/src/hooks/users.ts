import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteUser, fetchUser, updateUser } from '../api/userApi';
import useUserStore from '../stores/useUserStore';
import { User } from '../types';
import useCheckInStore from '../stores/useCheckInStore';

// Get token
export const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getToken = async () => {
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }
    return await getAccessTokenSilently();
  };

  return { getToken, isAuthenticated };
};

// Get (Create) user
export const useUser = () => {
  const { setUser } = useUserStore();
  const { setCheckIns } = useCheckInStore();
  const { getToken, isAuthenticated } = useAuthToken();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      const token = await getToken();
      const userData = await fetchUser(token);
      setUser(userData);
      setCheckIns(userData.checkIns);
      return userData;
    },
    enabled: isAuthenticated,
  });
};

// Update user
export const useUpdateUser = () => {
  const { user, setUser } = useUserStore();
  const { getToken, isAuthenticated } = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userData }: { userData: Partial<User> }) => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      const token = await getToken();
      return await updateUser(token, userData);
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser._id] });

      if (user && user._id === updatedUser._id) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setUser(updatedUser);
      }
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const { user, setUser } = useUserStore();
  const { getToken, isAuthenticated } = useAuthToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      const token = await getToken();
      await deleteUser(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (user) {
        setUser(null);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};
