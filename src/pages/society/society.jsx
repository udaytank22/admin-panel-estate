import React, { useState } from "react";
import TabsBar from "../../component/ui/societyPageTab";
import { images } from "../../assets/images";
import DataTable from "../../component/ui/tabel";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { TbCircleOff } from "react-icons/tb";

export default function Society() {
  const [activeTab, setActiveTab] = useState("Amenities");
  const [search, setSearch] = useState("");

  // ---------- AMENITY TABLE DATA ----------
  const amenities = [
    { id: 1, name: "Gym", time: "6AM – 10AM", status: "Available" },
    { id: 2, name: "Garden", time: "All Time", status: "Available" },
    {
      id: 3,
      name: "Swimming Pool",
      time: "6AM – 10AM",
      status: "Under Maintenance",
    },
  ];

  // ---------- SEARCH FILTER ----------
  const filteredData = amenities.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------- TABLE COLUMNS ----------
  const columns = [
    { label: "Sr. No", field: "id", center: true },
    { label: "Name", field: "name" },
    { label: "Time", field: "time", center: true },
    { label: "Status", field: "status", center: true },
    { label: "Action", field: "action", center: true },
  ];

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-[30px]">
        <div className="flex items-center gap-4">
          <img src={images.leftArrow} className="w-7 h-7 cursor-pointer" />
          <h2 className="text-xl font-semibold text-[#1A1A1A]">
            Ahmedabad Opal-1
          </h2>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>

      {/* TABS */}
      <TabsBar active={activeTab} onChange={setActiveTab} />

      {/* MAIN CARD */}
      <div className="bg-white p-4 mt-[20px] rounded-xl shadow-sm border border-gray-200">
        {/* REUSABLE DATA TABLE */}
        <DataTable
          columns={columns}
          data={filteredData} // filtered values
          onSearch={(value) => setSearch(value)} // live search
          onFilter={() => console.log("Filter Clicked")}
          onAdd={() => console.log("Add Amenity Clicked")}
          addButtonText="Add New Amenity"
          actions={(row) => (
            <div className="flex gap-4 justify-center">
              <button className="text-black">
                <FiEye size={18} />
              </button>
              <button className="text-black">
                <TbCircleOff size={18} />
              </button>
              <button className="text-black">
                <FiTrash2 size={18} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
