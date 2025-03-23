import React from 'react';
import { useUser } from '../hooks/users';

const Home: React.FC = () => {
  const { isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div>
      <h1>Welcome back</h1>
    </div>
  );
};

export default Home;
