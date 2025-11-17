import React from "react";

export default function TabsBar({ active, onChange }) {
  const tabs = ["Dashboard", "Residents", "Staff", "Amenities", "Billing", "Complaints"];

  return (
    <div className="w-full bg-white rounded-lg shadow border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onChange(tab)}
            className={`
              px-10 py-3 rounded-md font-medium text-base transition
              ${active === tab
                ? "bg-sky-400/10 bg-clip-text text-transparent bg-gradient-to-r from-[#034175] to-[#34B0F5]"
                : "text-black hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
