import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full h-full px-10 py-8">
      <h1 className="text-3xl font-bold text-[#034175] mb-4">Dashboard</h1>

      <p className="text-gray-600">
        Welcome to your admin dashboard. You can manage analytics, users,
        settings, and more.
      </p>

      {/* Example Dashboard Cards */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-[#034175]">Total Users</h2>
          <p className="text-3xl mt-2 font-bold">245</p>
        </div>

        <div className="p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-[#034175]">
            Active Bookings
          </h2>
          <p className="text-3xl mt-2 font-bold">18</p>
        </div>

        <div className="p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-[#034175]">
            Pending Requests
          </h2>
          <p className="text-3xl mt-2 font-bold">6</p>
        </div>
      </div>
    </div>
  );
}
