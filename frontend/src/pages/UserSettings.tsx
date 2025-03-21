import React from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormInput,
  SelectInput,
  ToggleButton,
} from '@/components/form/FormComponents';
import { userSchema, UserFormInputs } from '../schemas/userSchemas';
import { GrEmergency, GrNotification, GrAdd } from 'react-icons/gr';
import { IoRemove } from 'react-icons/io5';
import { useUpdateUser } from '@/hooks/users';
import { User } from '@/types';
import useToastStore from '@/stores/useToastStore';
import useUserStore from '@/stores/useUserStore';
import { useDeleteUser } from '@/hooks/users';

const UserSettings: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      phone: user?.phone || '',
      emergencyContact: user?.emergencyContact || [
        { firstname: '', lastname: '', phone: '', email: '' },
      ],
      reminder: user?.reminder || { method: null, timeOfDay: 'morning' },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emergencyContact',
  });

  const handleToggle = (method: 'sms' | 'email') => {
    const currentMethod = getValues('reminder.method');
    setValue('reminder.method', currentMethod === method ? null : method);
  };

  const updateUser = useUpdateUser();
  const { showToast } = useToastStore();
  const deleteUser = useDeleteUser();

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    const userData: Partial<User> = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      reminder: {
        method: data.reminder.method || null,
        timeOfDay: data.reminder.timeOfDay,
      },
      emergencyContact: data.emergencyContact.map((contact) => ({
        firstname: contact.firstname,
        lastname: contact.lastname,
        phone: contact.phone,
        email: contact.email || null,
      })),
    };
    console.log(userData);

    updateUser.mutate(
      { userData },
      {
        onSuccess: () => {
          showToast('Operation successful!', 'success');
        },
        onError: (error) => {
          console.error('Failed to update user:', error);
          showToast('Something went wrong!', 'error');
        },
      },
    );
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUser.mutateAsync();
        showToast('Account successfully deleted', 'success');
        window.location.href = '/';
      } catch (error) {
        console.error('Failed to delete user:', error);
        showToast('There was an error deleting your account.', 'error');
      }
    }
  };

  return (
    <div className="max-w-3/5 mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 flex gap-3 items-center">
        User Settings
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="flex gap-4">
          <FormInput
            label="First name"
            {...register('firstname')}
            error={errors.firstname?.message}
          />
          <FormInput
            label="Last name"
            {...register('lastname')}
            error={errors.lastname?.message}
          />
        </div>
        <div className="flex gap-4">
          <FormInput
            label="Phone number"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <FormInput
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <GrEmergency />
            Emergency Contact
          </h2>
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded space-y-4">
              <div className="flex gap-4">
                <FormInput
                  label="First name"
                  {...register(`emergencyContact.${index}.firstname` as const)}
                  error={errors.emergencyContact?.[index]?.firstname?.message}
                />
                <FormInput
                  label="Last name"
                  {...register(`emergencyContact.${index}.lastname` as const)}
                  error={errors.emergencyContact?.[index]?.lastname?.message}
                />
              </div>
              <div className="flex gap-4">
                <FormInput
                  label="Phone number"
                  {...register(`emergencyContact.${index}.phone` as const)}
                  error={errors.emergencyContact?.[index]?.phone?.message}
                />
                <FormInput
                  label="Email (Optional)"
                  type="email"
                  {...register(`emergencyContact.${index}.email` as const)}
                  error={errors.emergencyContact?.[index]?.email?.message}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 px-4 py-2 text-white bg-black rounded-md hover:opacity-80 flex items-center gap-2"
              >
                <IoRemove />
                Remove Contact
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ firstname: '', lastname: '', phone: '', email: '' })
            }
            className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:opacity-80 flex items-center gap-2"
          >
            <GrAdd />
            Add Contact
          </button>
        </div>

        {/* Notification */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <GrNotification />
            Reminders Setting
          </h2>
          <Controller
            name="reminder.method"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <ToggleButton
                  label="SMS"
                  isChecked={field.value === 'sms'}
                  onChange={() => handleToggle('sms')}
                />
                <ToggleButton
                  label="Email"
                  isChecked={field.value === 'email'}
                  onChange={() => handleToggle('email')}
                />
              </div>
            )}
          />
          <div className="flex gap-4 mb-10">
            <SelectInput
              label="Time"
              options={[
                { value: 'morning', label: 'Morning' },
                { value: 'afternoon', label: 'Afternoon' },
                { value: 'evening', label: 'Evening' },
              ]}
              {...register('reminder.timeOfDay')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-semibold rounded-md hover:opacity-80"
        >
          Save
        </button>
      </form>

      {/* Delete Button */}
      <button
        onClick={handleDeleteUser}
        className="mt-6 w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:opacity-80"
      >
        Delete Account
      </button>
    </div>
  );
};

export default UserSettings;
