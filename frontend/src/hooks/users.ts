import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/stores/useUserStore';
import { fetchUser, updateUser, deleteUser } from '@/api/userApi';
import { User } from '@/types';

// Get (Create) user
export const useUser = () => {
  const { token, setUser } = useUserStore();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) throw new Error('No authentication token available');
      const userData = await fetchUser(token);
      setUser(userData);
      return userData;
    },
    enabled: !!token,
  });
};

// Update user
export const useUpdateUser = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userData }: { userData: Partial<User> }) => {
      if (!token) throw new Error('No authentication token available');
      return await updateUser(token, userData);
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });

      const { user } = useUserStore.getState();
      if (user && user.id === updatedUser.id) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        useUserStore.getState().setUser(updatedUser);
      }
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('No authentication token available');
      await deleteUser(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      const { user } = useUserStore.getState();
      if (user) {
        useUserStore.getState().setUser(null);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};
