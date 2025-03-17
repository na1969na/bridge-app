import React from "react";
import { useForm } from "react-hook-form";
import { userSchema, UserFormInputs } from "../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const User: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormInputs) => {
    console.log(data);
    alert("Form submitted!");
  };

  return (
    <div className="max-w-3/5 bg-slate-50 mx-auto p-4 rounded-lg shadow-2xl">
      <h1 className="text-xl font-bold mb-4">User Information</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="phone"
              className="block text-lg font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <input
              {...register("phone")}
              id="phone"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="emergencyContact"
            className="block text-lg font-semibold text-gray-700"
          >
            Emergency Contact
          </label>
          <div className="mb-4">
            <label
              htmlFor="emergencyContact.name"
              className="block text-md text-gray-600"
            >
              Name
            </label>
            <input
              {...register("emergencyContact.0.name")}
              id="emergencyContact.name"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.emergencyContact?.[0]?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emergencyContact[0].name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="emergencyContact.phone"
              className="block text-md text-gray-600"
            >
              Phone Number
            </label>
            <input
              {...register("emergencyContact.0.phone")}
              id="emergencyContact.phone"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.emergencyContact?.[0]?.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emergencyContact[0].phone.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="emergencyContact.email"
              className="block text-md text-gray-600"
            >
              Email Address (Optional)
            </label>
            <input
              {...register("emergencyContact.0.email")}
              id="emergencyContact.email"
              type="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.emergencyContact?.[0]?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emergencyContact[0].email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="notificationSettings"
            className="block text-lg font-semibold text-gray-700"
          >
            Notification Settings
          </label>
          <div className="mb-4">
            <label
              htmlFor="isEnabled"
              className="inline-flex items-center text-md text-gray-600"
            >
              Enable Notifications
            </label>
            <input
              {...register("notificationSettings.isEnabled")}
              id="isEnabled"
              type="checkbox"
              className="ml-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timeOfDay" className="block text-md text-gray-600">
              Notification Time of Day
            </label>
            <select
              {...register("notificationSettings.timeOfDay")}
              id="timeOfDay"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="notificationMethod"
              className="block text-md text-gray-600"
            >
              Notification Method
            </label>
            <select
              {...register("notificationSettings.notificationMethod")}
              id="notificationMethod"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default User;
