import React, { useState } from 'react';
import { HealthStatus } from '@/types/checkIn';
import Calendar from '@/components/dashboard/Calendar';
import dayjs from 'dayjs';
import Card from '@/components/dashboard/Card';
import StatsCard from '@/components/dashboard/StatsCard';
import { FaCheckCircle, FaExclamationTriangle, FaBell } from 'react-icons/fa';
import { SelectInput } from '@/components/form/FormComponents';

const Dashboard: React.FC = () => {
  const [mood, setMood] = useState<{ [key: string]: HealthStatus | null }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const handleMoodChange = (date: string, status: HealthStatus) => {
    setMood((prevMood) => ({
      ...prevMood,
      [date]: status,
    }));
  };

  const stats = [
    { title: 'Feeling Good', count: 1 },
    { title: 'Physical Discomfort', count: 2 },
    { title: 'Mental Struggles', count: 3 },
  ];

  return (
    <div className="p-10">
      <div className="flex gap-10">
        <div className="flex flex-col w-1/3">
          <div className="bg-white rounded-3xl">
            {/* Calendar */}
            <Calendar
              currentDate={new Date()}
              mood={mood}
              onDateClick={(date) => setSelectedDate(date)}
            />
            {/* Section for changing health status */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                Mood for {dayjs(selectedDate).format('MMMM D')}
              </h2>
              <SelectInput
                options={[
                  { value: 'good', label: 'Feeling Good' },
                  { value: 'physical', label: 'Physical Discomfort' },
                  { value: 'mental', label: 'Mental Struggles' },
                ]}
                onSelectChange={(value) =>
                  handleMoodChange('2025-03-20', value as HealthStatus)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-2/3">
          <StatsCard stats={stats} />
          <div className="bg-white rounded-3xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-semibold">Your Check-In Info</h2>
            <Card
              title="Last Check-In"
              value="March 15"
              icon={<FaCheckCircle />}
            />
            <Card
              title="Un-Checked-In Time"
              value="48 hours"
              icon={<FaExclamationTriangle />}
            />
            <Card
              title="Next Notification"
              value="March 17, 18:00"
              icon={<FaBell />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
