import React from "react";

export default function CustomTextArea({
  label,
  placeholder = "",
  value,
  onChange,
  rows = 4,
}) {
  return (
    <div className="flex-1 flex flex-col gap-[5px] w-full">
      {/* Label */}
      <label className="text-black text-base font-[16px] leading-6">
        {label}
      </label>

      {/* Textarea Box */}
      <div className="rounded-xl border border-black/10 w-full px-4 py-3 bg-white">
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={rows}
          className="
            w-full
            outline-none
            text-gray-700
            text-base
            font-normal
            bg-transparent
            resize-none
          "
        />
      </div>
    </div>
  );
}
