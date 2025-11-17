
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Dropdown({ label, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mb-5 relative">
      <label
        className="text-[16px] font-semibold"
        style={{ color: "#034175", fontFamily: "Inter" }}
      >
        {label}
      </label>

      <div
        className="mt-2 px-4 h-[60px] bg-gray-100 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[16px] text-gray-700">
          {value || "Select option"}
        </span>
        <FiChevronDown size={20} className="text-gray-600" />
      </div>

      {open && (
        <div className="absolute w-full mt-1 bg-white shadow-md rounded-md border z-20 max-h-48 overflow-auto">
          {options.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
