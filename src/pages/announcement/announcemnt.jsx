import React, { useEffect, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { TbCircleOff } from "react-icons/tb";
import DataTable from "../../component/ui/tabel";
import AddAnnouncement from "../../component/formModals/addAnnouncementModal";
import { Announcement } from "../../services/announcement/announcementServices";
import ViewAnnouncement from "../../component/formModals/viewAnnouncementModal";
import moment from "moment";

export default function Announcemnt() {
  const [search, setSearch] = useState("");
  const [openAddAnnouncementModal, setOpenAddAnnouncementModal] =
    useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  console.log("selectedAnnouncement", selectedAnnouncement);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await Announcement();
      setAnnouncements(res?.results || []);
    } catch (err) {
      setError("Failed to load announcements");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const formattedData = announcements.map((item, i) => ({
    srno: i + 1,
    title: item?.title,
    date: item?.valid_until
      ? moment(item?.valid_until).format("DD MMM, YYYY")
      : "-",
    createdBy: item?.posted_by_name || "Admin",
  }));

  const columns = [
    { label: "Sr. No", field: "srno" },
    { label: "Title", field: "title" },
    { label: "Date", field: "date", center: true },
    { label: "Created By", field: "createdBy", center: true },
    { label: "Action", field: "action", center: true },
  ];

  return (
    <div>
      {/* PAGE TITLE */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          Announcements Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        {/* LOADING & ERROR STATES */}

        <DataTable
          columns={columns}
          data={formattedData.filter((a) =>
            a.title.toLowerCase().includes(search.toLowerCase())
          )}
          onSearch={(value) => setSearch(value)}
          isLoading={isLoading}
          onFilter={() => console.log("FILTER CLICKED")}
          onAdd={() => setOpenAddAnnouncementModal(true)}
          addButtonText="Add New Announcements"
          actions={(row, index) => (
            <div className="flex gap-4 justify-center text-black">
              <FiEye
                size={18}
                onClick={() => {
                  setSelectedAnnouncement(announcements[index]);
                  setOpenViewModal(true);
                }}
              />
              <FiTrash2 size={18} />
              <TbCircleOff size={18} />
            </div>
          )}
        />
      </div>

      <AddAnnouncement
        open={openAddAnnouncementModal}
        onClose={() => {
          setOpenAddAnnouncementModal(false);
          fetchAnnouncements();
        }}
      />
      <ViewAnnouncement
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        data={selectedAnnouncement}
      />
    </div>
  );
}
