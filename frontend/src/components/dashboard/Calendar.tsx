import React from "react";
import dayjs from "dayjs";
import { HealthStatus } from "@/types/checkIn";

interface CalendarProps {
  currentDate: Date;
  mood: { [key: string]: HealthStatus | null };
  onDateClick: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, mood, onDateClick }) => {
  const getMonthName = (date: Date) => {
    return dayjs(date).format("MMMM");
  };

  const generateCalendar = () => {
    const startOfMonth = dayjs(currentDate).startOf("month");
    const endOfMonth = dayjs(currentDate).endOf("month");
    const daysInMonth = endOfMonth.diff(startOfMonth, "days") + 1;

    const calendar = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
      calendar.push(date);
    }

    return calendar;
  };

  const getMoodClass = (status: HealthStatus | null) => {
    switch (status) {
      case HealthStatus.GOOD:
        return "text-white bg-rose hover:opacity-80";
      case HealthStatus.PHYSICAL:
        return "text-white bg-olive-green hover:opacity-80";
      case HealthStatus.MENTAL:
        return "text-white bg-lavender hover:opacity-80";
      default:
        return "hover:bg-stone-100";
    }
  };

  const calendarDays = generateCalendar();

  return (
    <div className="bg-green-50 border rounded-3xl w-full p-6">
      <h2 className="text-xl mb-8 text-center font-semibold">
        {getMonthName(currentDate)}
      </h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {[
          "S",
          "M",
          "T",
          "W",
          "T",
          "F",
          "S",
        ].map((day) => (
          <div key={day} className="text-stone-500">
            {day}
          </div>
        ))}

        {calendarDays.map((date) => (
          <div
            key={date}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onDateClick(date)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-black font-medium ${getMoodClass(
                mood[date]
              )}`}
            >
              {dayjs(date).format("D")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
