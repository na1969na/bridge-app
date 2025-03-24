import React, { useState, useEffect } from 'react';
import { CheckIn, HealthStatus } from '../../types';
import { useCreateCheckIn, useUpdateCheckIn } from '../../hooks/checkIns';
import useToastStore from '../../stores/useToastStore';
import useUserStore from '../../stores/useUserStore';
import useCheckInStore from '../../stores/useCheckInStore';

interface StateButtonProps {
  onClick: () => void;
  isSelected: boolean;
  label: string;
  colorSelected: string;
  colorUnselected: string;
}

const StateButton: React.FC<StateButtonProps> = ({
  onClick,
  isSelected,
  label,
  colorSelected,
  colorUnselected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-60 h-60 rounded-full px-6 py-3 font-semibold transition-colors duration-200 ${
        isSelected ? colorSelected : colorUnselected
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
        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
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
    <div className="bg-stone-100 rounded-3xl p-10">
      <h1 className="text-3xl font-semibold">How are you feeling today?</h1>
      <div className="flex gap-10 p-10 text-3xl">
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.GOOD)}
          isSelected={selectedMood === HealthStatus.GOOD}
          label="Feeling Good"
          colorSelected="bg-rose text-white"
          colorUnselected="bg-gray-300 text-black"
        />
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.PHYSICAL)}
          isSelected={selectedMood === HealthStatus.PHYSICAL}
          label="Physical Discomfort"
          colorSelected="bg-olive-green text-white"
          colorUnselected="bg-gray-300 text-black"
        />
        <StateButton
          onClick={() => setSelectedMood(HealthStatus.MENTAL)}
          isSelected={selectedMood === HealthStatus.MENTAL}
          label="Mental Struggles"
          colorSelected="bg-lavender text-white"
          colorUnselected="bg-gray-300 text-black"
        />
      </div>
      {}
      <button
        onClick={checkIn ? handleUpdate : handleCreate}
        className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:opacity-80 focus:outline-none transition-all duration-300"
      >
        {checkIn ? 'Update' : 'Check In'}
      </button>
    </div>
  );
};

export default CheckInInput;
