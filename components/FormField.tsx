import React from "react";
type Props = {
  type?: string;
  title: string;
  value: string;
  placeholder: string;
  isTextArea?: boolean;
  onChange: (e: any) => void;
  minLength?: number;
  maxLength?: number;
};

const FormField = ({
  type,
  title,
  value,
  placeholder,
  isTextArea,
  onChange,
  minLength,
  maxLength,
}: Props) => {
  return (
    <div className="flex flex-col w-full ">
      <label className="w-full">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          required
          className="p-1 rounded-sm w-full outline-0 bg-gray-100 border border-gray-300 h-96"
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          required
          className="p-1 rounded-sm w-full outline-0 bg-gray-100  border border-gray-300"
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

export default FormField;
