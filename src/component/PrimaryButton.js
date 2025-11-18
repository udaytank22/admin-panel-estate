import React from "react";

export default function PrimaryButton({ title, isError, onClick, isLoading }) {
  return (
    <button
      onClick={!isLoading ? onClick : null}
      disabled={isLoading}
      className={`
        w-full
        h-[69px]
        rounded-md
        font-semibold
        text-base
        transition-all duration-200
        flex items-center justify-center
        disabled:opacity-70 disabled:cursor-not-allowed
        ${isError
          ? "bg-gradient-to-r from-[#0A3D91] to-[#59B3FF] text-white"
          : "bg-[#F3F4F6] text-[#200D41]"
        }
      `}
    >
      {isLoading ? (
        // Spinner
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        title
      )}
    </button>
  );
}
