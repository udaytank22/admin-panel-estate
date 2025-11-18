import moment from "moment";
import SaveButton from "../saveButton";
import ModalWrapper from "./modalWrapper";
import AddAnnouncement from "./addAnnouncementModal";
import { useState } from "react";

// Check if valid_until > today
function isFutureDate(dateString) {
  if (!dateString) return false;
  return new Date(dateString) > new Date();
}

export default function ViewAnnouncement({ open, onClose, data }) {
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title=" Announcement detail Page"
      description="Lorem ipsum dolor sit amet consectetur."
    >
      <div className="px-2 pb-2">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#034175]">Title</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {data?.title || "—"}
          </p>

          {/* Description */}
          <h3 className="text-lg font-semibold text-[#034175]">Description</h3>
          <p className="text-gray-700 mb-2 leading-relaxed">
            {data?.content ||
              "Lorem ipsum dolor sit amet consectetur. Vitae mattis eu proin facilisis."}
          </p>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col">
              <label className="font-semibold text-[#034175]">
                Announced by:
              </label>
              <p className="mt-1 text-gray-700">
                {data?.posted_by_name || "Admin"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-[#034175]">
                Valid Date & Time:
              </label>
              <p className="mt-1 text-gray-700">
                {moment(data?.valid_until).format("DD MMM, YYYY")}
              </p>
            </div>
          </div>
        </div>

        {/* Show Edit button only when valid_until > Today */}
        {isFutureDate(data?.valid_until) && (
          <div className="flex justify-end mt-8">
            <SaveButton
              label="Edit"
              onClick={() => {
                setEditingAnnouncement(true);
              }}
            />
          </div>
        )}
      </div>
      <AddAnnouncement
        open={editingAnnouncement}
        announcementdata={data}
        onClose={() => {
          setEditingAnnouncement(false);
        }}
      />
    </ModalWrapper>
  );
}
