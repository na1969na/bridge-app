import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/users';
import useUserStore from '@/stores/useUserStore';

const PostLoginRedirect: React.FC = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useUser();
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
      } catch (error) {
        console.error('Failed to get token:', error);
      }
    };

    if (isAuthenticated && user) {
      fetchToken();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, setToken]);

  useEffect(() => {
    if (isLoading || isError) return;

    if (userData) {
      if (!userData.lastCheckedIn) {
        navigate('/settings');
      } else {
        navigate('/checkin');
      }
    }
  }, [userData, isLoading, isError, navigate]);

  return null;
};

export default PostLoginRedirect;
