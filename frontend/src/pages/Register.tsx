import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emergencyContactSchema = z.object({
  name: z.string().min(1, "Emergency contact name is required"),
  phone: z.string().min(1, "Emergency contact phone is required"),
});

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  emergencyContacts: z
    .array(emergencyContactSchema)
    .min(1, "At least one emergency contact is required"),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    timePreferences: z
      .array(z.enum(["Morning", "Afternoon", "Evening"]))
      .min(1, "Select at least one time preference")
      .optional(),
  }).refine(
    (data) => data.email || data.sms,
    { message: "At least one notification method (Email or SMS) is required" }
  ),
});

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      emergencyContacts: [{ name: "", phone: "" }],
      notifications: {
        email: false,
        sms: false,
        timePreferences: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted!");
  };

  const notifications = watch("notifications");

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">User Information Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border rounded p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-lg font-semibold">Emergency Contacts</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2 mb-4 border rounded p-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  {...register(`emergencyContacts.${index}.name` as const)}
                  className="w-full border rounded p-2"
                />
                {errors.emergencyContacts?.[index]?.name && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyContacts[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  {...register(`emergencyContacts.${index}.phone` as const)}
                  className="w-full border rounded p-2"
                />
                {errors.emergencyContacts?.[index]?.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyContacts[index]?.phone?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Contact
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", phone: "" })}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Contact
          </button>
          {errors.emergencyContacts && (
            <p className="text-red-500 text-sm">{errors.emergencyContacts.message}</p>
          )}
        </div>

        {/* Notification Settings */}
        <div>
          <h2 className="text-lg font-semibold">Notification Settings</h2>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("notifications.email")} />
            <label>Email Notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("notifications.sms")} />
            <label>SMS Notifications</label>
          </div>
          {errors.notifications?.message && (
            <p className="text-red-500 text-sm">{errors.notifications.message}</p>
          )}

          {notifications.email || notifications.sms ? (
            <div className="mt-2">
              <h3 className="text-sm font-medium">Preferred Times:</h3>
              <div className="space-y-1">
                <div>
                  <input
                    type="checkbox"
                    value="Morning"
                    {...register("notifications.timePreferences")}
                  />
                  <label className="ml-2">Morning</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Afternoon"
                    {...register("notifications.timePreferences")}
                  />
                  <label className="ml-2">Afternoon</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Evening"
                    {...register("notifications.timePreferences")}
                  />
                  <label className="ml-2">Evening</label>
                </div>
              </div>
              {errors.notifications?.timePreferences && (
                <p className="text-red-500 text-sm">
                  {errors.notifications.timePreferences.message}
                </p>
              )}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
