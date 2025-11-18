import { useState } from "react";
import TabsBar from "../../component/ui/societyPageTab";
import { ComplaintCard } from "../../component/cards/complaintCard";
import DataTable from "../../component/ui/tabel";
import { images } from "../../assets/images";
import { AiOutlineSearch } from "react-icons/ai";
import PillTabs from "../../component/ui/complaintTab";
import StatusBadge from "../../component/ui/statusBadge";
import AddNewComplaint from "../../component/formModals/addComplaintModal";

export default function Complaint() {
  const tabs = ["Complaints", "Requests"];
  const [activeTab, setActiveTab] = useState("Complaints");
  const [search, setSearch] = useState("");
  const [openAddComplaintModal, setOpenAddComplaintModal] = useState(false);

  const complaintData = [
    {
      id: "#C101",
      category: "Water Leakage in bathroom",
      name: "Rakesh Sharma",
      mobile: "+91 9925103055",
      house: "A-101",
      date: "19-10-2025",
      status: "Pending",
      priority: "High",
    },
    {
      id: "#C102",
      category: "Electricity Fluctuation",
      name: "Amit Patel",
      mobile: "+91 9898123456",
      house: "B-202",
      date: "19-10-2025",
      status: "In-Progress",
      priority: "Medium",
    },
    {
      id: "#C103",
      category: "Cleaning Required in Staircase",
      name: "Priya Singh",
      mobile: "+91 9825123456",
      house: "C-303",
      date: "19-10-2025",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: "#C104",
      category: "Visitor Gate Pass Approval",
      name: "Rutuja Mehta",
      mobile: "+91 9874512345",
      house: "D-410",
      date: "19-10-2025",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: "#C105",
      category: "Amenity Booking Rejected",
      name: "Rahul Verma",
      mobile: "+91 9966554477",
      house: "A-404",
      date: "19-10-2025",
      status: "Rejected",
      priority: "Low",
    },
  ];

  let filteredList =
    activeTab === "Requests"
      ? complaintData.filter((item) => item.status === "Pending")
      : complaintData;

  const finalData = filteredList.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { label: "Id", field: "id", center: false },
    { label: "Complaint Title", field: "category" },
    { label: "Date", field: "date", center: true },
    { label: "Complaint by", field: "name" },
    {
      label: "Status",
      field: "status",
      center: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">
          Complaints & Requests
        </h2>
        <p className="text-gray-500 text-sm">
          Manage all complaints and user raised requests.
        </p>
      </div>

      <PillTabs active={activeTab} onChange={setActiveTab} tabs={tabs} />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mt-3">
        {activeTab === "Complaints" && (
          <DataTable
            columns={columns}
            data={finalData}
            onSearch={(v) => setSearch(v)}
            onAdd={() => setOpenAddComplaintModal(true)}
            onFilter={() => console.log("Filter opened")}
            addButtonText="Add New Complaints"
          />
        )}

        {activeTab === "Requests" && (
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex w-[470px] items-center border border-gray-300 rounded-lg px-3 h-12 bg-white">
                <AiOutlineSearch size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="ml-2 flex-1 outline-none text-gray-700 text-sm"
                />
              </div>

              <div className="flex-1 flex justify-end">
                <button className="flex items-center gap-2 border border-gray-300 px-4 h-12 rounded-lg hover:bg-gray-50">
                  <img src={images.filter} alt="filter" className="w-5 h-5" />
                  <span className="text-sm font-medium">Filter</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {finalData.length === 0 ? (
                <p className="text-gray-500 text-center col-span-2">
                  No requests found for “{search}”.
                </p>
              ) : (
                finalData.map((item) => (
                  <ComplaintCard key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <AddNewComplaint
        open={openAddComplaintModal}
        onClose={() => setOpenAddComplaintModal(false)}
      />
    </div>
  );
}
