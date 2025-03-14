import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../api/userApi";

const PostLoginRedirect = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserRedirection = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          
          const userData = await fetchUserData(token);

          if (!userData.lastCheckin) {
            navigate("/register-info");
          } else {
            navigate("/checkin");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          throw error;
        }
      }
    };

    handleUserRedirection();
  }, [getAccessTokenSilently, isAuthenticated, user, navigate]);

  return null;
};

export default PostLoginRedirect;
