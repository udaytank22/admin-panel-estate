import React, { useState } from "react";
import { images } from "../../assets/images";
import ModalWrapper from "./modalWrapper";
import Tabs from "../ui/tabs";
import SaveButton from "../saveButton";
import CustomFormInput from "../ui/formInput";
import DropdownComponent from "../ui/dropdownComponent";
import RadioButton from "../ui/radioButton";

export default function AddUserModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  // RADIO GROUP STATES
  const [personalStatus, setPersonalStatus] = useState("Active");
  const [houseOwnership, setHouseOwnership] = useState("Owner");
  const [houseCurrentState, setHouseCurrentState] = useState("Residing");
  const [pet, setPet] = useState("No");
  const [businessType, setBusinessType] = useState("Business");

  // DROPDOWN STATES
  const [role, setRole] = useState("");
  const [flat, setFlat] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [relation, setRelation] = useState("");
  const [gender, setGender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [industry, setIndustry] = useState("");

  const tabs = [
    "Personal Details",
    "House Details",
    "Vehicle",
    "Family Member",
    "Documents",
    "Business",
  ];

  // -----------------------------------------
  // TAB CONTENT
  // -----------------------------------------
  const renderTabContent = () => {
    const grid = "grid grid-cols-2 gap-6 w-full";

    switch (activeTab) {
      // PERSONAL DETAILS
      case 0:
        return (
          <div className={grid}>
            <CustomFormInput label="Full Name" placeholder="Enter full name" />

            <DropdownComponent
              label="Select Role"
              options={["Admin", "Member", "Security"]}
              value={role}
              onChange={setRole}
            />

            <div className="col-span-2">
              <label className="font-semibold text-[#034175]">Status</label>
              <div className="flex items-center gap-8 mt-2">
                <RadioButton
                  label="Active"
                  value="Active"
                  selected={personalStatus}
                  onChange={setPersonalStatus}
                />
                <RadioButton
                  label="Inactive"
                  value="Inactive"
                  selected={personalStatus}
                  onChange={setPersonalStatus}
                />
              </div>
            </div>
          </div>
        );

      // HOUSE DETAILS
      case 1:
        return (
          <div className={grid}>
            <DropdownComponent
              label="Select Flat"
              options={["101", "202", "303"]}
              value={flat}
              onChange={setFlat}
            />

            <div>
              <label className="font-semibold text-[#034175]">I am an/a</label>
              <div className="flex gap-10 mt-2">
                <RadioButton
                  label="Owner"
                  value="Owner"
                  selected={houseOwnership}
                  onChange={setHouseOwnership}
                />
                <RadioButton
                  label="Tenant"
                  value="Tenant"
                  selected={houseOwnership}
                  onChange={setHouseOwnership}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="font-semibold text-[#034175]">
                Currently I am
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {["Residing", "Vacant", "Tenants", "Moving"].map((opt) => (
                  <RadioButton
                    key={opt}
                    label={opt}
                    value={opt}
                    selected={houseCurrentState}
                    onChange={setHouseCurrentState}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#034175]">
                Do you have a pet?
              </label>
              <div className="flex gap-10 mt-2">
                <RadioButton
                  label="Yes"
                  value="Yes"
                  selected={pet}
                  onChange={setPet}
                />
                <RadioButton
                  label="No"
                  value="No"
                  selected={pet}
                  onChange={setPet}
                />
              </div>
            </div>

            {pet === "Yes" && (
              <>
                <CustomFormInput label="Pet Type" placeholder="Eg. Dog" />
                <CustomFormInput
                  label="Description"
                  placeholder="Enter description"
                />
              </>
            )}
          </div>
        );

      // VEHICLE
      case 2:
        return (
          <div className={grid}>
            <DropdownComponent
              label="Vehicle Type"
              options={["Car", "Bike", "Scooter"]}
              value={vehicleType}
              onChange={setVehicleType}
            />

            <CustomFormInput
              label="Vehicle Number"
              placeholder="Vehicle Number"
            />
            <CustomFormInput label="Model/Brand" placeholder="Brand" />
            <CustomFormInput label="Owner Name" placeholder="Owner Name" />
            <CustomFormInput label="Colour" placeholder="Colour" />
            <CustomFormInput label="Manufacturing Year" placeholder="Year" />

            <DropdownComponent
              label="Fuel Type"
              options={["Petrol", "Diesel", "CNG"]}
              value={fuelType}
              onChange={setFuelType}
            />

            <CustomFormInput
              label="Insurance Expiry"
              placeholder="Select date"
            />
            <CustomFormInput label="RC Expiry" placeholder="Select date" />
            <CustomFormInput
              label="Pollution Expiry"
              placeholder="Select date"
            />
          </div>
        );

      // FAMILY MEMBER
      case 3:
        return (
          <div className={grid}>
            <CustomFormInput label="Family Member Name" placeholder="Name" />

            <DropdownComponent
              label="Relation"
              options={["Father", "Mother", "Son", "Daughter"]}
              value={relation}
              onChange={setRelation}
            />

            <DropdownComponent
              label="Gender"
              options={["Male", "Female"]}
              value={gender}
              onChange={setGender}
            />

            <CustomFormInput label="Date of Birth" placeholder="Select date" />
            <CustomFormInput label="Mobile Number" placeholder="Number" />
            <CustomFormInput label="Email" placeholder="Email" />

            <div className="flex items-center gap-3 mt-2">
              <span className="font-semibold text-[#034175]">Is Active</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        );

      // DOCUMENTS
      case 4:
        return (
          <div className={grid}>
            <DropdownComponent
              label="Document Type"
              options={["Aadhar", "PAN", "Driving License"]}
              value={documentType}
              onChange={setDocumentType}
            />
            <div>
              <label className="font-semibold text-[#034175]">Attachment</label>
              <div className="border border-dashed rounded-xl text-center py-3 mt-2 text-blue-500 cursor-pointer">
                Upload Image / PDF
              </div>
            </div>
          </div>
        );

      // BUSINESS
      case 5:
        return (
          <div className={grid}>
            <div>
              <label className="font-semibold text-[#034175]">
                Profession Type
              </label>
              <div className="flex gap-10 mt-2">
                <RadioButton
                  label="Business"
                  value="Business"
                  selected={businessType}
                  onChange={setBusinessType}
                />
                <RadioButton
                  label="Job"
                  value="Job"
                  selected={businessType}
                  onChange={setBusinessType}
                />
              </div>
            </div>

            <CustomFormInput
              label="Business Name"
              placeholder="Business Name"
            />

            <DropdownComponent
              label="Industry Type"
              options={["IT", "Shop", "Factory"]}
              value={industry}
              onChange={setIndustry}
            />

            <CustomFormInput
              label="Business Contact Details"
              placeholder="Contact"
            />
            <CustomFormInput label="Business Email" placeholder="Email" />
            <CustomFormInput label="Description" placeholder="Description" />
            <CustomFormInput label="Address" placeholder="Address" />
            <CustomFormInput label="Pin Code" placeholder="Pin Code" />
          </div>
        );
    }
  };

  // -----------------------------------------
  // RENDER MODAL
  // -----------------------------------------
  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Add New User"
      description="Lorem ipsum dolor sit amet consectetur."
    >
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="border rounded-xl p-6 mt-5 max-h-[70vh] overflow-y-auto">
        <div className="flex gap-6 items-start">
          {activeTab === 0 && (
            <img
              src={images.profileImage}
              alt="User"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          <div className="flex-1">{renderTabContent()}</div>
        </div>

        <div className="flex justify-end mt-10">
          <SaveButton />
        </div>
      </div>
    </ModalWrapper>
  );
}
