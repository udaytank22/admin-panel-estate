import { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import UploadFileComponent from "./uploadFileComponent";

export default function AddNewAmmenities({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    rules: "",
    terms: "",
    capacity: "",
    status: true,
    amount: "",
    fee_type: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Add New Amenities"
      description=""
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        {/* GRID FORM */}
        <div className="grid grid-cols-2 gap-6">
          {/* NAME */}
          <CustomFormInput
            label="Name *"
            placeholder="Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          {/* DESCRIPTION */}
          <CustomFormInput
            label="Description *"
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          {/* RULES */}
          <CustomFormInput
            label="Rules & Regulation *"
            placeholder="Rules & Regulation"
            value={form.rules}
            onChange={(e) => updateField("rules", e.target.value)}
          />

          {/* TERMS */}
          <CustomFormInput
            label="Terms & Conditions *"
            placeholder="Terms & Conditions"
            value={form.terms}
            onChange={(e) => updateField("terms", e.target.value)}
          />

          {/* CAPACITY */}
          <CustomFormInput
            label="Capacity *"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
          />

          {/* STATUS TOGGLE */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-black text-base font-[16px]">Status</label>

            <div className="h-14 rounded-xl border border-black/10 px-4 flex items-center justify-between bg-white">
              <span className="text-gray-700 text-base">Available</span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.status}
                  onChange={(e) => updateField("status", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          {/* FEES ROW */}
          <CustomFormInput
            label="Fees (in Rupees)"
            placeholder="Amount(₹)"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
          />

          <DropdownComponent
            label="Fees Type"
            placeholder="Select Type"
            value={form.fee_type}
            onChange={(val) => updateField("fee_type", val)}
            options={["Hourly", "Daily", "Monthly", "Yearly"]}
          />

          {/* ATTACHMENT — FULL WIDTH */}
          <div className="col-span-2">
            <UploadFileComponent
              label="Attachment"
              onChange={(file) => updateField("attachment", file)}
            />
          </div>
        </div>
        {/* GRID END */}

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Add New Amenities" />
        </div>
      </div>
    </ModalWrapper>
  );
}
