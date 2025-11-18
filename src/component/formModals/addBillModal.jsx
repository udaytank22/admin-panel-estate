import { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import UploadFileComponent from "./uploadFileComponent";
import RadioButton from "../ui/radioButton";
import { FiCalendar } from "react-icons/fi";

export default function AddNewBill({ open, onClose }) {
  const [form, setForm] = useState({
    bill_type: "General",
    flat_no: "",
    category: "",
    amount: "",
    status: "",
    due_date: "",
    attachment: null,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Add New Bill"
      description=""
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        {/* ===== BILL TYPE (RADIO) ===== */}
        <div className="mb-4">
          <label className="text-black text-base font-[16px]">Bill Type</label>

          <div className="flex items-center gap-8 mt-3">
            <RadioButton
              label="General"
              value="General"
              selected={form.bill_type}
              onChange={(val) => updateField("bill_type", val)}
            />
            <RadioButton
              label="Maintenance"
              value="Maintenance"
              selected={form.bill_type}
              onChange={(val) => updateField("bill_type", val)}
            />
          </div>
        </div>

        {/* ===== GRID FORM ===== */}
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
            placeholder="Category"
            value={form.category}
            onChange={(val) => updateField("category", val)}
            options={["Water", "Electricity", "Maintenance", "Parking"]}
          />

          {/* AMOUNT */}
          <CustomFormInput
            label="Amount(₹) *"
            placeholder="Amount(₹)"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
          />

          {/* STATUS */}
          <DropdownComponent
            label="Status *"
            placeholder="Status"
            value={form.status}
            onChange={(val) => updateField("status", val)}
            options={["Paid", "Unpaid", "Pending"]}
          />

          {/* DUE DATE */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-black text-base font-[16px]">
              Due Date *
            </label>

            <div className="h-14 rounded-xl border border-black/10 px-4 flex items-center justify-between bg-white">
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => updateField("due_date", e.target.value)}
                className="w-full outline-none text-gray-700 text-base bg-transparent"
              />
            </div>
          </div>

          {/* ATTACHMENT - FULL WIDTH */}
          <div className="col-span-2">
            <UploadFileComponent
              label="Attachment"
              onChange={(file) => updateField("attachment", file)}
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Add Bill" />
        </div>
      </div>
    </ModalWrapper>
  );
}
