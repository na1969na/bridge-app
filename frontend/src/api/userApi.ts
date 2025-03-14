import apiClient from "./apiClient";

interface UserData {
  id: string;
  name: string;
  lastCheckin?: string;
}

export const fetchUserData = async (token: string): Promise<UserData> => {
  try {
    const response = await apiClient.post<UserData>(
      "/api/users",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
