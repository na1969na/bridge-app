import React, { useState } from "react";
import { HealthStatus } from "@/types/checkIn";
import Calendar from "@/components/dashboard/Calendar";
import dayjs from "dayjs";
import Card from "@/components/dashboard/Card";
import { FaCheckCircle, FaExclamationTriangle, FaBell } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [mood, setMood] = useState<{ [key: string]: HealthStatus | null }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const handleMoodChange = (date: string, status: HealthStatus) => {
    setMood((prevMood) => ({
      ...prevMood,
      [date]: status,
    }));
  };

  return (
    <div className="p-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 w-1/2">
          {/* Calendar */}
          <Calendar
            currentDate={new Date()}
            mood={mood}
            onDateClick={(date) => setSelectedDate(date)}
          />

          {/* Section for changing health status */}
          <div className="bg-green-50 border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-2">
              Mood for {dayjs(selectedDate).format("MMMM D")}
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  handleMoodChange(selectedDate, HealthStatus.GOOD)
                }
                className="px-6 py-3 rounded-lg bg-rose text-white"
              >
                Feeling Good
              </button>
              <button
                onClick={() =>
                  handleMoodChange(selectedDate, HealthStatus.PHYSICAL)
                }
                className="px-6 py-3 rounded-lg bg-olive-green text-white"
              >
                Physical Discomfort
              </button>
              <button
                onClick={() =>
                  handleMoodChange(selectedDate, HealthStatus.MENTAL)
                }
                className="px-6 py-3 rounded-lg bg-lavender text-white"
              >
                Mental Struggles
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/2">
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
          <div className="py-6 rounded-3xl bg-green-50 border flex items-center space-x-10 justify-center">
            <div>
              <h3 className="text-lg font-semibold">Feeling Good</h3>
              <p className="text-2xl text-center">1</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Physical Discomfort</h3>
              <p className="text-2xl text-center">2</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mental Struggles</h3>
              <p className="text-2xl text-center">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
