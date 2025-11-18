import { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import CustomTextArea from "./customTextArea";

export default function AddNewBooking({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    flat: "",
    amenities: "",
    mobile: "",
    description: "",
    start_date: "",
    end_date: "",
    people: "",
    payment_mode: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Book Amenities"
      description=""
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        <div className="grid grid-cols-2 gap-6">
          {/* NAME */}
          <CustomFormInput
            label="Name *"
            placeholder="Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          {/* FLAT NUMBER */}
          <DropdownComponent
            label="Flat No *"
            placeholder="Flat No"
            value={form.flat}
            onChange={(val) => updateField("flat", val)}
            options={["A-101", "A-102", "B-201", "C-305"]} // demo
          />

          {/* AMENITIES */}
          <DropdownComponent
            label="Select Amenities *"
            placeholder="Select Amenities"
            value={form.amenities}
            onChange={(val) => updateField("amenities", val)}
            options={["Swimming Pool", "Club House", "Garden", "Banquet Hall"]} // demo
          />

          {/* MOBILE NUMBER */}
          <CustomFormInput
            label="Mobile Number *"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
          />

          {/* DESCRIPTION (FULL WIDTH) */}
          <div className="col-span-2">
            <CustomTextArea
              label="Description *"
              placeholder="Description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          {/* START DATE & TIME */}
          <div>
            <label className="text-black text-base font-[16px] leading-6">
              Start Date & Time *
            </label>
            <div className="h-14 rounded-xl border border-black/10 px-4 bg-white flex items-center">
              <input
                type="datetime-local"
                value={form.start_date}
                onChange={(e) => updateField("start_date", e.target.value)}
                className="w-full outline-none text-gray-700 text-base bg-transparent"
              />
            </div>
          </div>

          {/* END DATE & TIME */}
          <div>
            <label className="text-black text-base font-[16px] leading-6">
              End Date & Time *
            </label>
            <div className="h-14 rounded-xl border border-black/10 px-4 bg-white flex items-center">
              <input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => updateField("end_date", e.target.value)}
                className="w-full outline-none text-gray-700 text-base bg-transparent"
              />
            </div>
          </div>

          {/* NUMBER OF PEOPLE */}
          <CustomFormInput
            label="Number of People *"
            placeholder="Number of People"
            value={form.people}
            onChange={(e) => updateField("people", e.target.value)}
          />

          {/* PAYMENT MODE */}
          <DropdownComponent
            label="Payment Mode *"
            placeholder="Payment Mode"
            value={form.payment_mode}
            onChange={(val) => updateField("payment_mode", val)}
            options={["Cash", "UPI", "Card", "Net Banking"]}
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Add New Booking" />
        </div>
      </div>
    </ModalWrapper>
  );
}
