import { useState } from "react";
import TabsBar from "../../component/ui/societyPageTab";
import { images } from "../../assets/images";
import { AiOutlineSearch } from "react-icons/ai";
import { BookingCard } from "../../component/cards/bookingCard";
import AddNewBooking from "../../component/formModals/addAmenitiesBooking";

export default function Booking() {
  const tabs = ["Pending", "Approved", "Rejected", "Canceled"];
  const [activeTab, setActiveTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [openBookingModal, setOpenBookingModal] = useState(false);

  const bookingList = {
    Pending: [
      {
        id: 1,
        amenity: "Club House",
        name: "Rakesh Sharma",
        mobile: "+91 99251030555",
        house: "A-101",
        date: "21 Nov 2025",
        time: "6 PM - 8 PM",
        status: "Pending",
        reason: "Awaiting society admin approval",
      },
      {
        id: 2,
        amenity: "Swimming Pool",
        name: "Amit Patel",
        mobile: "+91 9898123456",
        house: "B-202",
        date: "23 Nov 2025",
        time: "4 PM - 5 PM",
        status: "Pending",
        reason: "Pending verification of slot availability",
      },
    ],

    Approved: [
      {
        id: 3,
        amenity: "Garden Area",
        name: "Priya Singh",
        mobile: "+91 9825123456",
        house: "C-303",
        date: "18 Nov 2025",
        time: "5 PM - 6 PM",
        status: "Approved",
        reason: "Booking approved by society admin",
      },
    ],

    Rejected: [
      {
        id: 4,
        amenity: "Banquet Hall",
        name: "Rutuja Mehta",
        mobile: "+91 9874512345",
        house: "D-410",
        date: "19 Nov 2025",
        time: "3 PM - 5 PM",
        status: "Rejected",
        reason: "Slot already occupied by another booking",
      },
    ],

    Canceled: [
      {
        id: 5,
        amenity: "Gym",
        name: "Rahul Verma",
        mobile: "+91 9966554477",
        house: "A-404",
        date: "15 Nov 2025",
        time: "7 AM - 8 AM",
        status: "Canceled",
        reason: "User canceled the booking",
      },
    ],
  };

  const data = bookingList[activeTab];

  // Filter search
  const filteredData = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">
          Amenities Booking
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage and approve society amenities booking.
        </p>
      </div>

      {/* TABS */}
      <TabsBar active={activeTab} onChange={setActiveTab} tabs={tabs} />

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mt-2">
        <div className="flex items-center mb-4">
          <div className="flex w-[470px] items-center border border-gray-300 rounded-lg px-3 h-12 bg-white">
            <AiOutlineSearch size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 flex-1 outline-none text-gray-700 text-sm"
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-300 px-4 h-12 rounded-lg hover:bg-gray-50">
              <img src={images.filter} alt="filter" className="w-5 h-5" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <button
              onClick={() => setOpenBookingModal(true)}
              className="h-12 px-5 bg-gradient-to-l from-sky-400 to-sky-900
                                    rounded-[10px] flex items-center gap-2.5 shadow text-white"
            >
              <img src={images.add} alt="add" className="w-5 h-5" />
              <span className="text-base font-medium">Add New Booking</span>
            </button>
          </div>
        </div>

        {/* CARD LIST (2 COLUMN GRID) */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          {filteredData.length === 0 ? (
            <p className="text-gray-500">No booking requests found.</p>
          ) : (
            filteredData.map((item) => (
              <BookingCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
      <AddNewBooking
        open={openBookingModal}
        onClose={() => setOpenBookingModal(false)}
      />
    </div>
  );
}
