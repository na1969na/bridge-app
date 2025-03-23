import React, { useState } from 'react';
import { HealthStatus } from '../../types';

const CheckInInput: React.FC = () => {
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);

  const [selectedMood, setSelectedMood] = useState<HealthStatus | null>(null);

  const handleMoodSelect = (mood: HealthStatus) => {
    setSelectedMood(mood);
  };

  const handleClick = () => {
    console.log('Selected Mood:', selectedMood);
    setIsShowMessage(!isShowMessage);
  };

  return (
    <div className='bg-white rounded-3xl p-10'>
      {isShowMessage ? (
        <>
          <p>Thank you for checking in!</p>
          <img src="/cat_img.svg" alt="Cat image" className="w-40 h-40" />
        </>
      ) : (
        <>
          <h1 className='text-4xl font-semibold'>How are you feeling today?</h1>
          {/* <div className="flex space-x-4 p-10 text-3xl">
            <Button
              onClick={() => handleMoodSelect(HealthStatus.GOOD)}
              isSelected={selectedMood === HealthStatus.GOOD}
              label="Feeling Good"
              colorSelected="bg-rose text-white"
              colorUnselected="bg-gray-300 text-black"
            />
            <Button
              onClick={() => handleMoodSelect(HealthStatus.PHYSICAL)}
              isSelected={selectedMood === HealthStatus.PHYSICAL}
              label="Physical Discomfort"
              colorSelected="bg-olive-green text-white"
              colorUnselected="bg-gray-300 text-black"
            />
            <Button
              onClick={() => handleMoodSelect(HealthStatus.MENTAL)}
              isSelected={selectedMood === HealthStatus.MENTAL}
              label="Mental Struggles"
              colorSelected="bg-lavender text-white"
              colorUnselected="bg-gray-300 text-black"
            />
          </div> */}
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:opacity-80 focus:outline-none transition-all duration-300"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default CheckInInput;
