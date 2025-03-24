import React from 'react';
import dayjs from 'dayjs';
import { HealthStatus } from '../../types';
import useCheckInStore from '../../stores/useCheckInStore';

interface CalendarProps {
  currentDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const { checkIns } = useCheckInStore();
  console.log(checkIns);
  const getMonthName = (date: Date) => {
    return dayjs(date).format('MMMM');
  };

  const generateCalendar = () => {
    const startOfMonth = dayjs(currentDate).startOf('month');
    const endOfMonth = dayjs(currentDate).endOf('month');
    const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;

    const calendar = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = startOfMonth.add(i, 'day').format('YYYY-MM-DD');
      calendar.push(date);
    }

    return calendar;
  };

  const getMoodClass = (status: HealthStatus | null) => {
    switch (status) {
      case HealthStatus.GOOD:
        return 'text-white bg-rose';
      case HealthStatus.PHYSICAL:
        return 'text-white bg-olive-green';
      case HealthStatus.MENTAL:
        return 'text-white bg-lavender';
    }
  };

  const mood: { [key: string]: HealthStatus | null } = {};
  
  checkIns.forEach((checkIn) => {
    const date = dayjs(checkIn.createdAt).format('YYYY-MM-DD');
    mood[date] = checkIn.healthStatus;
  });

  const calendarDays = generateCalendar();

  return (
    <div className="bg-zinc-900 text-white rounded-3xl w-full max-w-md mx-auto aspect-square p-6">
      <h2 className="text-xl mb-8 font-semibold flex justify-between items-end">
        <span>Your Wellness Days</span>
        <span className="text-sm text-stone-500">
          {getMonthName(currentDate)}
        </span>
      </h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-stone-500">
            {day}
          </div>
        ))}

        {calendarDays.map((date) => (
          <div key={date} className="flex flex-col items-center cursor-pointer">
            <div
              className={`w-full aspect-square text-lg rounded-full flex items-center justify-center ${getMoodClass(
                mood[date],
              )}`}
            >
              {dayjs(date).format('D')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
