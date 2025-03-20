import React, { useState } from 'react';
import { HealthStatus } from '@/types/checkIn';

const CheckIn: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<HealthStatus | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleMoodSelect = (mood: HealthStatus) => {
    setSelectedMood(mood);
  };

  const handleClick = () => {
    console.log('Selected Mood:', selectedMood);
    setMessage('Thank you for checking in!');
  };

  return (
    <div
      className="flex items-center justify-center bg-[url(/checkin_bg.svg)] bg-center bg-cover bg-no-repeat h-96 w-full"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <div className="p-10 pt-15 text-center text-6xl font-semibold flex flex-col items-center gap-10">
        {message ? (
          <>
            <p>{message}</p>
            <img src="/cat_img.svg" alt="Cat image" className="w-40 h-40" />
          </>
        ) : (
          <>
            <h1>Welcome back,</h1>
            <div className="flex items-center">
              <h2>How are you today?</h2>
              <img
                src="/checkin_img.svg"
                alt="Check in image"
                className="w-30 h-30 ml-4"
              />
            </div>
            <div className="flex space-x-4 p-10 text-4xl">
              <button
                onClick={() => handleMoodSelect(HealthStatus.GOOD)}
                className={`px-20 py-10 rounded-full font-semibold ${
                  selectedMood === HealthStatus.GOOD
                    ? 'bg-rose text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                Feeling Good
              </button>
              <button
                onClick={() => handleMoodSelect(HealthStatus.PHYSICAL)}
                className={`px-6 py-3 rounded-full font-semibold ${
                  selectedMood === HealthStatus.PHYSICAL
                    ? 'bg-olive-green text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                Physical Discomfort
              </button>
              <button
                onClick={() => handleMoodSelect(HealthStatus.MENTAL)}
                className={`px-6 py-3 rounded-full font-semibold ${
                  selectedMood === HealthStatus.MENTAL
                    ? 'bg-lavender text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                Mental Struggles
              </button>
            </div>
            <div className="mt-6 flex justify-center text-3xl">
              <button
                onClick={handleClick}
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:opacity-80 focus:outline-none transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
