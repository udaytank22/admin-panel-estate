import { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import UploadFileComponent from "./uploadFileComponent";

export default function AddNewComplaint({ open, onClose }) {
  const [form, setForm] = useState({
    flat_no: "",
    category: "",
    title: "",
    description: "",
    attachment: null,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Add New Complaint"
      description=""
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        {/* === TWO-COLUMN GRID === */}
        <div className="grid grid-cols-2 gap-6">
          {/* FLAT NO */}
          <DropdownComponent
            label="Flat No *"
            placeholder="Flat No"
            value={form.flat_no}
            onChange={(val) => updateField("flat_no", val)}
            options={["A-101", "A-102", "B-201", "B-202"]}
          />

          {/* CATEGORY */}
          <DropdownComponent
            label="Category *"
            placeholder="Select Category"
            value={form.category}
            onChange={(val) => updateField("category", val)}
            options={[
              "Water Issue",
              "Electricity Issue",
              "Lift Issue",
              "Parking Issue",
              "Security Issue",
              "General Maintenance",
            ]}
          />

          {/* TITLE */}
          <CustomFormInput
            label="Title *"
            placeholder="Title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          {/* DESCRIPTION */}
          <CustomFormInput
            label="Description *"
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          {/* ATTACHMENT — FULL WIDTH */}
          <div className="col-span-2">
            <UploadFileComponent
              label="Attachment"
              onChange={(file) => updateField("attachment", file)}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Submit Complaint" />
        </div>
      </div>
    </ModalWrapper>
  );
}
