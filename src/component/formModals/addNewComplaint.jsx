import { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import UploadFileComponent from "./uploadFileComponent";
import SaveButton from "../saveButton";

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
        {/* FORM GRID */}
        <div className="grid grid-cols-2 gap-6">
          {/* FLAT NO */}
          <DropdownComponent
            label="Flat No *"
            placeholder="Flat No"
            value={form.flat_no}
            onChange={(val) => updateField("flat_no", val)}
            options={["A-101", "A-102", "B-202", "C-303", "D-410"]}
          />

          {/* CATEGORY */}
          <DropdownComponent
            label="Category *"
            placeholder="Select Category"
            value={form.category}
            onChange={(val) => updateField("category", val)}
            options={[
              "Water Leakage",
              "Electricity",
              "Cleanliness",
              "Visitor Issue",
              "Amenity Issue",
            ]}
          />

          {/* TITLE – FULL WIDTH */}
          <div className="col-span-2">
            <CustomFormInput
              label="Title *"
              placeholder="Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          {/* DESCRIPTION – FULL WIDTH */}
          <div className="col-span-2">
            <label className="text-black text-base font-[16px] leading-6">
              Description *
            </label>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Description"
              className="w-full h-28 rounded-xl border border-black/10 px-4 py-3 mt-1 outline-none text-gray-700 text-base resize-none bg-white"
            />
          </div>

          {/* ATTACHMENT – FULL WIDTH */}
          <div className="col-span-2">
            <UploadFileComponent
              label="Attachment"
              placeholder="Upload Image / PDF"
              onChange={(file) => updateField("attachment", file)}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Add New Amenities" />
        </div>
      </div>
    </ModalWrapper>
  );
}
