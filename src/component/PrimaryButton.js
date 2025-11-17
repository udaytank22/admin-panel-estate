import React from "react";

export default function PrimaryButton({ title, isError, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        h-[69px]
        rounded-md
        font-semibold
        text-base
        transition-all duration-200
        flex items-center justify-center
        ${isError
          ? "bg-gradient-to-r from-[#0A3D91] to-[#59B3FF] text-white"
          : "bg-[#F3F4F6] text-[#200D41]"
        }
      `}
    >
      {title}
    </button>
  );
}
