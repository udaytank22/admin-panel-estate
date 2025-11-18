import { useEffect, useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import CustomTextArea from "./customTextArea";
import axios from "axios"; // if using axios
import {
  AddAnnouncementData,
  UpdateAnnouncement,
} from "../../services/announcement/announcementServices";
import { toast } from "react-toastify";

export default function AddAnnouncement({ open, onClose, announcementdata }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    priority: "",
    valid_until: "",
    audience: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto-fill when editing
  useEffect(() => {
    if (announcementdata) {
      setForm({
        title: announcementdata?.title || "",
        content: announcementdata?.content || "",
        priority: announcementdata?.priority || "",
        valid_until: announcementdata?.valid_until?.split("T")[0] || "",
        audience: announcementdata?.audience || "",
        category: announcementdata?.category || "",
      });
    } else {
      // Reset when opening in Add mode
      setForm({
        title: "",
        content: "",
        priority: "",
        valid_until: "",
        audience: "",
        category: "",
      });
    }
  }, [announcementdata, open]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const jsonData = {
        title: form.title,
        content: form.content,
        priority: form.priority,
        valid_until: form.valid_until,
        audience: form.audience,
        category: form.category,
      };

      console.log("formData", jsonData);

      let response;

      if (announcementdata) {
        response = await UpdateAnnouncement(announcementdata.id, jsonData);
      } else {
        response = await AddAnnouncementData(jsonData);
      }

      console.log("API Response:", response);

      if (response.success) {
        onClose();
        toast.success(
          announcementdata ? "Announcement Editied" : "Announcement Added"
        );
      }
    } catch (error) {
      console.log("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={announcementdata ? "Edit Announcement" : "Add New Announcement"}
      description=""
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <CustomFormInput
              label="Title *"
              placeholder="Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <CustomTextArea
              label="Content *"
              placeholder="Enter content"
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
            />
          </div>

          <DropdownComponent
            label="Priority *"
            placeholder="Select Priority"
            value={form.priority}
            onChange={(val) => updateField("priority", val)}
            options={["Low", "Medium", "High", "Urgent"]}
          />

          <div>
            <label className="font-semibold text-[#034175]">
              Valid Until *
            </label>

            <div className="mt-1 flex items-center gap-2 border border-gray-300 bg-white rounded-md px-3 h-12">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.valid_until}
                onChange={(e) => updateField("valid_until", e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          <DropdownComponent
            label="Targeted Audience *"
            placeholder="Select Audience"
            value={form.audience}
            onChange={(val) => updateField("audience", val)}
            options={[
              "All Residents",
              "Owners Only",
              "Tenants",
              "Security Team",
            ]}
          />

          <DropdownComponent
            label="Category *"
            placeholder="Select Category"
            value={form.category}
            onChange={(val) => updateField("category", val)}
            options={[
              "General Information",
              "Emergency",
              "Maintenance",
              "Event",
              "Security Update",
            ]}
          />
        </div>

        <div className="flex justify-end mt-8">
          <SaveButton
            title={
              loading
                ? "Saving..."
                : announcementdata
                ? "Update Announcement"
                : "Add Announcement"
            }
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalWrapper>
  );
}
