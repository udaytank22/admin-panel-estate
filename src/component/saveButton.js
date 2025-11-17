// src/component/ui/SaveButton.jsx

import React from "react";

export default function SaveButton({
  label = "Save",
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-12 py-3
        rounded-[10px]
        bg-gradient-to-l from-sky-400 to-sky-900
        inline-flex justify-center items-center gap-2.5
        text-white text-lg font-medium leading-6 font-['Inter']
        transition-all duration-150
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
      `}
    >
      {label}
    </button>
  );
}
