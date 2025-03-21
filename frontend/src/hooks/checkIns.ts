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
