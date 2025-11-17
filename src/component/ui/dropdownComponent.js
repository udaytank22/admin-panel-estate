import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function DropdownComponent({
  label,
  placeholder = "Select option",
  options = [],
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // CLOSE when clicked OUTSIDE
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[5px] w-full relative" ref={dropdownRef}>
      {/* LABEL */}
      {label && (
        <label className="text-black text-base font-[16px] leading-6">
          {label}
        </label>
      )}

      {/* MAIN DROPDOWN FIELD */}
      <div
        className="
          h-14 rounded-xl outline outline-1 outline-offset-[-1px] outline-black/10
          bg-white w-full px-4 flex items-center justify-between
          cursor-pointer select-none
        "
        onClick={() => setOpen(!open)}
      >
        <span
          className={`text-base ${value ? "text-gray-800" : "text-gray-400"
            }`}
        >
          {value || placeholder}
        </span>

        <FiChevronDown
          size={20}
          className={`text-gray-700 transition-transform ${open ? "rotate-180" : "rotate-0"
            }`}
        />
      </div>

      {/* OPTIONS LIST */}
      {open && (
        <div
          className="
            absolute top-[72px] left-0 w-full
            bg-white rounded-xl shadow-lg border border-gray-200
            z-50 max-h-56 overflow-auto animate-fadeIn
          "
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer text-gray-700 text-base
                hover:bg-gray-100 transition
                ${opt === value ? "bg-gray-100 font-medium" : ""}
              `}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
