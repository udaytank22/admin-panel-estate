import { useState } from "react";
import TabsBar from "../../component/ui/societyPageTab";
import DataTable from "../../component/ui/tabel";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import AddUserModal from "../../component/formModals/addUserModal";
import AddNewStaff from "../../component/formModals/addStaffModal";
import AddNewAmmenities from "../../component/formModals/addAmenitiesModal";
import AddNewBill from "../../component/formModals/addBillModal";
import AddNewComplaint from "../../component/formModals/addComplaintModal";
import DashboardContent from "../../component/ui/dashboardContent";

export default function Society() {
  const tabs = [
    "Dashboard",
    "Residents",
    "Staff",
    "Amenities",
    "Billing",
    "Complaints",
  ];

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddStaffModal, setOpenAddStaffModal] = useState(false);
  const [openAddAmenitiesModal, setOpenAddAmenitiesModal] = useState(false);
  const [openAddBillModal, setOpenAddBillModal] = useState(false);
  const [openAddComplaintModal, setOpenAddComplaintModal] = useState(false);

  // ---------------- ALL TAB DATA ----------------
  const tabData = {
    Dashboard: [],

    Residents: [
      {
        id: 1,
        name: "Rakesh Sharma",
        flat_no: "A-101",
        status: "A-101",
        mobile: "+91 99256 23555",
      },
      {
        id: 2,
        name: "Rakesh Sharma",
        flat_no: "A-101",
        status: "A-101",
        mobile: "+91 99256 23555",
      },
    ],

    Staff: [
      {
        id: 1,
        name: "Ram Mehta",
        status: "Checked in",
        role: "Security",
        agency: "Abc",
        mobile: "99523 56888",
      },
      {
        id: 2,
        name: "Name",
        status: "On Leave",
        role: "Cleaning",
        agency: "None",
        mobile: "99523 56888",
      },
    ],

    Amenities: [
      {
        id: 1,
        name: "Gym",
        time: "6AM – 10AM",
        status: "Available",
        fees: "500",
      },
      {
        id: 2,
        name: "Garden",
        time: "All Time",
        status: "Available",
        fees: "500",
      },
      {
        id: 3,
        name: "Swimming Pool",
        time: "6AM – 10AM",
        status: "Under Maintenance",
        fees: "500",
      },
    ],

    Billing: [
      {
        id: 1,
        bill_no: "B101",
        amount: "₹2000",
        status: "Paid",
        type: "Maintnance",
        date: "1 Nov 2025",
      },
      {
        id: 2,
        bill_no: "B102",
        amount: "₹3500",
        status: "Unpaid",
        type: "General",
        date: "5 Nov 2025",
      },
    ],

    Complaints: [
      {
        id: 1,
        title: "Water Leakage",
        flat: "A-204",
        status: "Resolved",
        date: "10 Nov",
      },
      {
        id: 2,
        title: "Lift Not Working",
        flat: "B-302",
        status: "Pending",
        date: "11 Nov",
      },
    ],
  };

  // ---------------- TABLE CONFIG FOR EACH TAB ----------------
  const tabConfig = {
    Dashboard: {
      columns: [],
      addButtonText: "",
      specialButtons: null,
    },

    Residents: {
      columns: [
        { label: "Sr. No", field: "id", center: false },
        { label: "Name", field: "name" },
        { label: "Flat No", field: "flat_no", center: true },
        { label: "Status", field: "status", center: true },
        { label: "Mobile Number", field: "mobile", center: true },
        { label: "Action", field: "action", center: true },
      ],
      addButtonText: "Add New Member",
      specialButtons: null,
    },

    Staff: {
      columns: [
        { label: "Name", field: "name" },
        {
          label: "Status",
          field: "status",
          center: true,
          render: (row) => (
            <span
              className={`
        px-3 py-1 rounded-lg text-sm font-medium
        ${
          row.status.toLowerCase() === "checked in"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
            >
              {row.status}
            </span>
          ),
        },
        { label: "Role", field: "role", center: true },
        { label: "Agency", field: "agency", center: true },
        { label: "Mobile Number", field: "mobile", center: true },
        { label: "Action", field: "action", center: true },
      ],
      addButtonText: "Add New Staff",
    },

    Amenities: {
      columns: [
        { label: "Sr. No", field: "id", center: false },
        { label: "Name", field: "name" },
        { label: "Time", field: "time", center: true },
        { label: "Fees", field: "fees", center: true },
        { label: "Status", field: "status", center: true },
        { label: "Action", field: "action", center: true },
      ],
      addButtonText: "Add New Amenity",
      specialButtons: null,
    },

    Billing: {
      columns: [
        { label: "Bill No", field: "bill_no" },
        { label: "Amount", field: "amount", center: true },
        { label: "Type", field: "type", center: true },
        { label: "Status", field: "status", center: true },
        { label: "Date", field: "date", center: true },
        { label: "Action", field: "action", center: true },
      ],
      addButtonText: "Add Bill",
      specialButtons: null,
    },

    Complaints: {
      columns: [
        { label: "Title", field: "title" },
        { label: "Flat", field: "flat", center: true },
        { label: "Status", field: "status", center: true },
        { label: "Date", field: "date", center: true },
        { label: "Action", field: "action", center: true },
      ],
      addButtonText: "Add Complaint",
      specialButtons: null,
    },
  };

  const currentColumns = tabConfig[activeTab].columns;
  const currentData = tabData[activeTab];
  const addButtonText = tabConfig[activeTab].addButtonText;
  const specialButtons = tabConfig[activeTab].specialButtons;

  const filteredData = currentData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-[30px]">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              Ahmedabad Opal-1
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        {/* TABS */}
        <TabsBar active={activeTab} onChange={setActiveTab} tabs={tabs} />

        {/* MAIN CARD */}
        <div className="bg-white p-4 mt-[20px] rounded-xl shadow-sm border border-gray-200">
          {/* SPECIAL BUTTONS (Staff page only) */}
          {specialButtons}

          {/* NOTHING FOR DASHBOARD */}
          {activeTab === "Dashboard" ? (
            <DashboardContent />
          ) : (
            <DataTable
              columns={currentColumns}
              data={filteredData}
              onSearch={(value) => setSearch(value)}
              onFilter={() => console.log("Filter Clicked")}
              onAdd={() => {
                if (activeTab === "Residents") {
                  setOpenAddModal(true);
                } else if (activeTab === "Staff") {
                  setOpenAddStaffModal(true);
                } else if (activeTab === "Amenities") {
                  setOpenAddAmenitiesModal(true);
                } else if (activeTab === "Billing") {
                  setOpenAddBillModal(true);
                } else if (activeTab === "Complaints") {
                  setOpenAddComplaintModal(true);
                }
              }}
              addButtonText={addButtonText}
              extraActions={
                <>
                  {activeTab === "Staff" && (
                    <>
                      <button className="h-12 p-5 bg-red-500 rounded-[10px] inline-flex justify-center items-center gap-2.5 text-white">
                        Check Out
                      </button>
                      <button className="h-12 p-5 bg-green-500 rounded-[10px] inline-flex justify-center items-center gap-2.5 text-white">
                        Check In
                      </button>
                    </>
                  )}
                  {activeTab === "Residents" && (
                    <button className="relative flex items-center gap-2 border border-gray-300 px-4 h-12 rounded-lg hover:bg-gray-50">
                      {/* Button Text */}
                      <span className="text-sm font-medium">New Request</span>

                      {/* Red Notification Badge */}
                      <span
                        className="
      absolute -top-2 -right-2
      w-5 h-5
      bg-[#E25454]
      text-white
      text-xs font-semibold
      rounded-full
      flex items-center justify-center
      shadow-md
    "
                      >
                        2
                      </span>
                    </button>
                  )}
                </>
              }
              actions={() => (
                <div className="flex gap-4 justify-center">
                  <button>
                    <FiEye size={18} />
                  </button>
                  <button>
                    <FiEdit size={18} />
                  </button>
                  <button>
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}
            />
          )}
        </div>
      </div>
      <AddUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
      <AddNewStaff
        open={openAddStaffModal}
        onClose={() => setOpenAddStaffModal(false)}
      />
      <AddNewAmmenities
        open={openAddAmenitiesModal}
        onClose={() => setOpenAddAmenitiesModal(false)}
      />
      <AddNewBill
        open={openAddBillModal}
        onClose={() => setOpenAddBillModal(false)}
      />
      <AddNewComplaint
        open={openAddComplaintModal}
        onClose={() => setOpenAddComplaintModal(false)}
      />
    </>
  );
}
