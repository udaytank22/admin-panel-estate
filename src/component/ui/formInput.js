import React from "react";

export default function CustomFormInput({
  label,
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <div className="flex-1 flex flex-col gap-[5px] w-full">
      {/* Label */}
      <label className="text-black text-base font-[16px] leading-6">
        {label}
      </label>

      {/* Input Box */}
      <div className="h-14 rounded-xl border border-black/10 w-full px-4 flex items-center bg-white">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full outline-none text-gray-700 text-base font-normal bg-transparent"
        />
      </div>
    </div>
  );
}
