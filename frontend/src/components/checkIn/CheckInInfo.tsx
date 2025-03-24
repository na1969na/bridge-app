import React from 'react';
import { FaBell, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import useUserStore from '../../stores/useUserStore';
import { format } from 'date-fns';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between gap-3 border-b border-stone-400">
      <div className="text-xl flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

const CheckInInfo: React.FC = () => {
  const { user } = useUserStore();

  console.log(user);

  if (!user) {
    return <div>Error</div>;
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) {
      return 'None';
    }
    const date = new Date(dateString);
    return format(date, 'MM/dd HH:mm');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastCheckedIn = user.lastCheckedIn
    ? new Date(user.lastCheckedIn)
    : null;

  let unCheckedInTime = '';
  if (lastCheckedIn) {
    lastCheckedIn.setHours(0, 0, 0, 0);

    const timeDifference = today.getTime() - lastCheckedIn.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference === 0) {
      unCheckedInTime = 'Checked in today';
    } else {
      unCheckedInTime = `${Math.floor(daysDifference)} day(s) ago`;
    }
  } else {
    unCheckedInTime = 'No check-in history';
  }

  const getReminderTime = (timeOfDay?: string | null): string => {
    if (!timeOfDay) return 'Not set';

    const reminderTimes: Record<string, string> = {
      morning: '9:00 AM',
      afternoon: '1:00 PM',
      evening: '5:00 PM',
    };

    return reminderTimes[timeOfDay] || 'Not set';
  };

  const checkInInfo = [
    {
      title: 'Last Check-In',
      value: formatDate(user.lastCheckedIn),
      icon: <FaCheckCircle />,
    },
    {
      title: 'Un-Checked-In Time',
      value: unCheckedInTime,
      icon: <FaExclamationTriangle />,
    },
    {
      title: 'Next Reminder',
      value: user?.reminder?.timeOfDay
        ? getReminderTime(user.reminder.timeOfDay)
        : 'No reminder set',

      icon: <FaBell />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {checkInInfo.map((info, index) => (
        <Card
          key={index}
          title={info.title}
          value={info.value}
          icon={info.icon}
        />
      ))}
    </div>
  );
};

export default CheckInInfo;
