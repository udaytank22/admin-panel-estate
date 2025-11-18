import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { TbCircleOff } from "react-icons/tb";
import DataTable from "../../component/ui/tabel";
import AddNewAmmenities from "../../component/formModals/addAmenitiesModal";

export default function Event() {
  // ---------------- DEMO DATA ----------------
  const demoEvents = [
    {
      id: 1,
      name: "Gym",
      time: "6AM - 10AM",
      status: "Available",
    },
    {
      id: 2,
      name: "Garden",
      time: "All Time",
      status: "Available",
    },
    {
      id: 3,
      name: "Swimming Pool",
      time: "6AM - 10AM",
      status: "Under Maintenance",
    },
  ];

  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [events, setEvents] = useState(demoEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openAddAmenitiesModal, setOpenAddAmenitiesModal] = useState(false);

  const columns = [
    { label: "Sr. No", field: "id", center: false },
    { label: "Name", field: "name" },
    { label: "Time", field: "time" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action", center: true }, // <-- THIS WAS MISSING
  ];

  const filteredEvents = events.filter((ev) =>
    ev.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <div>
      {/* PAGE TITLE */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          Events & Amenities
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <DataTable
          columns={columns}
          data={filteredEvents}
          isLoading={loading}
          onSearch={(value) => setSearch(value)}
          onAdd={() => setOpenAddAmenitiesModal(true)}
          addButtonText="Add New Amenity"
          actions={(row) => (
            <div className="flex gap-4 justify-center items-center">
              <button className="text-black">
                <FiEye size={18} />
              </button>

              <button className="text-black">
                <TbCircleOff
                  size={20}
                  onClick={() => alert("Disable clicked for " + row.raw.name)}
                />
              </button>

              <button className="text-black">
                <FiTrash2 size={18} onClick={() => handleDelete(row.raw.id)} />
              </button>
            </div>
          )}
        />
      </div>
      <AddNewAmmenities
        open={openAddAmenitiesModal}
        onClose={() => setOpenAddAmenitiesModal(false)}
      />
    </div>
  );
}
