import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function CustomInput({
  label,
  value,
  onChange,
  secure = false,
  error = "",
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full mb-5">
      <label
        className="text-[16px] font-semibold"
        style={{ color: "#034175", fontFamily: "Inter" }}
      >
        {label}
      </label>

      <div
        className={`
          mt-2 flex items-center px-4 h-[60px] rounded-md
          transition-all duration-150
          ${focused ? "bg-white border border-[#000000]" : "bg-gray-100 border border-gray-300"}
          ${error ? "border-red-500 bg-white" : ""}
        `}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <input
          type={secure ? (showPassword ? "text" : "password") : "text"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-[16px] text-[#000]"
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        />

        {secure && (
          <button
            type="button"
            className="ml-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-[#FF0101] text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
