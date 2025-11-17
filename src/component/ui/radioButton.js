import React from "react";

export default function RadioButton({
  label,
  value,
  selected,
  onChange,
  disabled = false,
}) {
  const isSelected = selected === value;

  return (
    <button
      type="button"
      className={`
        flex items-center cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
    >
      {/* Outer Circle */}
      <div
        className={`
          w-5 h-5 rounded-full border
          flex items-center justify-center
          transition-all
          ${isSelected ? "border-[#034175]" : "border-gray-400"}
        `}
      >
        {/* Inner Circle (Gradient) */}
        {isSelected && (
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#034175] to-[#0260A6]" />
        )}
      </div>

      {/* Label */}
      <span className="ml-3 text-gray-800 text-sm">{label}</span>
    </button>
  );
}
