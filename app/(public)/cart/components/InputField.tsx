"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export default function InputField({
  label,
  error,
  register,
  className,
  disabled,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...register}
        className={`w-full p-2 border rounded ${
          disabled ? "bg-gray-200" : ""
        } ${className}`}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
