import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  ...props
}) => (
  <div className="w-full md:w-1/2">
    <label className="font-semibold">{label}</label>
    <input
      {...props}
      className="w-full mt-2 p-3 border rounded-md focus: outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  error,
  options,
  ...props
}) => (
  <div className="w-full md:w-1/2">
    <label className="font-semibold">{label}</label>
    <select
      {...props}
      className="block w-full mt-2 p-3 border rounded-md focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface ToggleButtonProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      <span className="ms-3 font-semibold">{label}</span>
    </label>
  );
};
