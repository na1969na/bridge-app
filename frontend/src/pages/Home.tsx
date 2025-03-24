import React from 'react';
import { useUser } from '../hooks/users';
import StatsCard from '../components/checkIn/StatsCard';
import Calendar from '../components/checkIn/Calendar';
import CheckInInput from '../components/checkIn/CheckInInput';
import CheckInInfo from '../components/checkIn/CheckInInfo';
import LoadingHomePage from '../components/LoadingHomePage';

const Home: React.FC = () => {
  const { isLoading, isError } = useUser();

  if (isLoading) {
    return <LoadingHomePage />;
  }

  if (isError) {
    return <div>Loading check-in data...</div>;
  }

  return (
    <div className="px-5 py-2 md:px-10 md:py-5">
      <div className="flex flex-col lg:flex-row gap-5">
        <CheckInInput />
        <CheckInInfo />
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        <Calendar />
        <StatsCard />
        <img src="checkin_img.svg" alt="" className="hidden lg:block w-1/3 lg:animate-slide-up"/>
      </div>
    </div>
  );
};

export default Home;
