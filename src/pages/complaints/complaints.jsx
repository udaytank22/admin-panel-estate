import React from "react";

export default function Complaint({ title, children }) {
  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#034175] mb-4">Complaint</h1>

      {/* Page Container */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        {children || <p className="text-gray-500">Content coming soon...</p>}
      </div>
    </div>
  );
}
