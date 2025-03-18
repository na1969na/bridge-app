import React, { useState } from "react";
import { HealthStatus } from "@/types/checkIn";
import dayjs from "dayjs";
import { format } from "date-fns";

const Dashboard: React.FC = () => {
  const [mood, setMood] = useState<{ [key: string]: HealthStatus | null }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthName = (date: Date) => {
    return format(date, "MMMM yyyy");
  };

  // 月間カレンダーを作成
  const generateCalendar = () => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    const daysInMonth = endOfMonth.diff(startOfMonth, "days") + 1;

    const calendar = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
      calendar.push(date);
    }

    return calendar;
  };

  const handleMoodChange = (date: string, status: HealthStatus) => {
    setMood((prevMood) => ({
      ...prevMood,
      [date]: status,
    }));
  };

  const getMoodClass = (status: HealthStatus | null) => {
    switch (status) {
      case HealthStatus.GOOD:
        return "bg-green-500";
      case HealthStatus.PHYSICAL:
        return "bg-red-500";
      case HealthStatus.MENTAL:
        return "bg-purple-500";
      default:
        return "bg-gray-200";
    }
  };

  const calendarDays = generateCalendar();

  return (
    <div className="p-10">
      <div className="bg-stone-50 rounded-3xl shadow-lg w-1/2 p-6">
        {/* Calendar */}
        <h2 className="text-2xl font-semibold mb-4">{getMonthName(currentDate)}</h2>
        <div className="grid grid-cols-7 gap-2">
          <div className="text-center font-bold">Sun</div>
          <div className="text-center font-bold">Mon</div>
          <div className="text-center font-bold">Tue</div>
          <div className="text-center font-bold">Wed</div>
          <div className="text-center font-bold">Thu</div>
          <div className="text-center font-bold">Fri</div>
          <div className="text-center font-bold">Sat</div>

          {calendarDays.map((date) => (
            <div
              key={date}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-sm">{dayjs(date).format("D")}</div>
              <div
                className={`w-10 h-10 rounded-full ${getMoodClass(mood[date])}`}
              />
            </div>
          ))}
        </div>

        {/* Change Health Status */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Mood for {dayjs(selectedDate).format("MMMM D, YYYY")}
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleMoodChange(selectedDate, HealthStatus.GOOD)}
              className="px-6 py-3 rounded-lg bg-green-500 text-white"
            >
              Feeling Good
            </button>
            <button
              onClick={() =>
                handleMoodChange(selectedDate, HealthStatus.PHYSICAL)
              }
              className="px-6 py-3 rounded-lg bg-red-500 text-white"
            >
              Physical Discomfort
            </button>
            <button
              onClick={() =>
                handleMoodChange(selectedDate, HealthStatus.MENTAL)
              }
              className="px-6 py-3 rounded-lg bg-purple-500 text-white"
            >
              Mental Struggles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
