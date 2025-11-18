import React, { useState } from "react";
import ModalWrapper from "./modalWrapper";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import SaveButton from "../saveButton";
import { FiCalendar } from "react-icons/fi";
import UploadFileComponent from "./uploadFileComponent";

export default function AddNewStaff({ open, onClose }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    department: "",
    designation: "",
    joining_date: "",
    basic_salary: "",
    address: "",
    emergency_phone: "",
    emergency_name: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Add New Staff"
      description="Enter the data to add staff"
    >
      <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
        {/* GRID FORM START */}
        <div className="grid grid-cols-2 gap-6">
          <CustomFormInput
            label="First Name"
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
          />

          <CustomFormInput
            label="Last Name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
          />

          <CustomFormInput
            label="Email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <CustomFormInput
            label="Phone No"
            placeholder="Phone No"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <CustomFormInput
            label="Password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />

          <CustomFormInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={(e) => updateField("confirm_password", e.target.value)}
          />

          <DropdownComponent
            label="Department"
            placeholder="Department"
            value={form.department}
            onChange={(val) => updateField("department", val)}
            options={["Cleaning", "Security", "Maintenance"]}
          />

          <DropdownComponent
            label="Designation"
            placeholder="Designation"
            value={form.designation}
            onChange={(val) => updateField("designation", val)}
            options={["Supervisor", "Guard", "Manager"]}
          />

          {/* JOINING DATE */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-black text-base font-[16px] leading-6">
              Joining Date
            </label>

            <div className="h-14 rounded-xl border border-black/10 px-4 flex items-center justify-between bg-white">
              <input
                type="date"
                value={form.joining_date}
                onChange={(e) => updateField("joining_date", e.target.value)}
                className="w-full outline-none text-gray-700 text-base bg-transparent"
              />
            </div>
          </div>

          <CustomFormInput
            label="Basic Salary"
            placeholder="Basic Salary"
            value={form.basic_salary}
            onChange={(e) => updateField("basic_salary", e.target.value)}
          />

          {/* ADDRESS (FULL WIDTH) */}
          <div className="col-span-2">
            <CustomFormInput
              label="Address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          <CustomFormInput
            label="Emergency Contact Phone"
            placeholder="Emergency Contact Phone"
            value={form.emergency_phone}
            onChange={(e) => updateField("emergency_phone", e.target.value)}
          />

          <CustomFormInput
            label="Emergency Contact Name"
            placeholder="Emergency Contact Name"
            value={form.emergency_name}
            onChange={(e) => updateField("emergency_name", e.target.value)}
          />

          {/* FILE UPLOAD — FULL WIDTH */}
          <div className="col-span-2">
            <UploadFileComponent
              label="Add Profile"
              onChange={(file) => updateField("attachment", file)}
            />
          </div>
        </div>
        {/* GRID END */}

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-8">
          <SaveButton title="Add New Staff" />
        </div>
      </div>
    </ModalWrapper>
  );
}
