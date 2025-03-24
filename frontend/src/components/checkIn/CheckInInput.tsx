import React, { useState, useEffect } from 'react';
import { CheckIn, HealthStatus } from '../../types';
import { useCreateCheckIn, useUpdateCheckIn } from '../../hooks/checkIns';
import useToastStore from '../../stores/useToastStore';
import useUserStore from '../../stores/useUserStore';
import useCheckInStore from '../../stores/useCheckInStore';
import { Button } from '../common/Button';

interface StateButtonProps {
  onClick: () => void;
  isSelected: boolean;
  label: string;
  colorSelected: string;
}

const StateButton: React.FC<StateButtonProps> = ({
  onClick,
  isSelected,
  label,
  colorSelected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full md:w-50 md:h-50 lg:w-60 lg:h-60 rounded-full px-3 py-1 lg:px-6 lg:py-3 font-semibold transition-colors duration-200 ${
        isSelected ? colorSelected : "bg-stone-200 text-black"
      }`}
    >
      {label}
    </button>
  );
};

const CheckInInput: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<HealthStatus | null>(null);
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);
  const { checkIns, setCheckIns, updateCheckInData } = useCheckInStore();
  const createCheckIn = useCreateCheckIn();
  const updateCheckIn = useUpdateCheckIn();
  const { showToast } = useToastStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (checkIns && checkIns.length > 0) {
      const latestCheckIn = checkIns.reduce((latest, current) => {
        return new Date(current.createdAt) > new Date(latest.createdAt)
          ? current
          : latest;
      }, checkIns[0]);
      setCheckIn(latestCheckIn);
    }
  }, [checkIns]);

  const handleCreate = () => {
    if (selectedMood === null) {
      showToast('Select your feeling.', 'info');
      return;
    }

    createCheckIn.mutate(
      { checkIn: { userId: user?._id, healthStatus: selectedMood } },
      {
        onSuccess: (data) => {
          setCheckIn(data);
          setCheckIns([...checkIns, data]);
          showToast('Thank you for checking in!', 'success');
        },
        onError: (error) => {
          console.error('Error creating check-in:', error);
          showToast('Something went wrong!', 'error');
        },
      },
    );
  };

  const handleUpdate = () => {
    console.log(checkIns);
    if (selectedMood === null) {
      showToast('Select your feeling.', 'info');
      return;
    }

    if (!checkIn?._id) {
      showToast('Check-in ID is missing.', 'error');
      return;
    }

    updateCheckIn.mutate(
      { id: checkIn?._id, healthStatus: selectedMood },
      {
        onSuccess: (data) => {
          setCheckIn(data);
          updateCheckInData({ ...data });
          showToast('Check-in updated successfully!', 'success');
        },
        onError: (error) => {
          console.error('Error updating check-in:', error);
          showToast('Something went wrong!', 'error');
        },
      },
    );
  };

  return (
    <div className="bg-stone-100 rounded-3xl p-5 lg:p-10 w-full lg:w-4/5 lg:animate-slide-up">
      <h1 className="text-lg md:text-3xl font-semibold">How are you feeling today?</h1>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 p-5 lg:p-10 text-lg lg:text-3xl justify-center items-center">
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.GOOD)}
          isSelected={selectedMood === HealthStatus.GOOD}
          label="Feeling Good"
          colorSelected="bg-rose text-white"
        />
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.PHYSICAL)}
          isSelected={selectedMood === HealthStatus.PHYSICAL}
          label="Physical Discomfort"
          colorSelected="bg-olive-green text-white"
        />
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.MENTAL)}
          isSelected={selectedMood === HealthStatus.MENTAL}
          label="Mental Struggles"
          colorSelected="bg-lavender text-white"
        />
      </div>
      <div className="flex justify-center md:justify-end">
        <Button size="md" onClick={checkIn ? handleUpdate : handleCreate} className='px-8 py-3'>
          {checkIn ? 'Update' : 'Check In'}
        </Button>
      </div>
    </div>
  );
};

export default CheckInInput;
