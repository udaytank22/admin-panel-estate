import { useState } from "react";
import { images } from "../../assets/images";
import ModalWrapper from "./modalWrapper";
import Tabs from "../ui/tabs";
import SaveButton from "../saveButton";

// REUSABLE READ-ONLY FIELD
const ReadOnlyField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[#034175] font-semibold">{label}</span>
    <span className="text-gray-700 mt-1">{value || "—"}</span>
  </div>
);

export default function ViewUserDetails({ open, onClose, user = {} }) {
  const [activeTab, setActiveTab] = useState(0);

  // ------------------ USER STATES (PRE-FILLED OR API DATA) ------------------
  const [firstName] = useState("Anuj");
  const [lastName] = useState("Mehta");
  const [countryCode] = useState("+91");
  const [mobile] = useState("9925165555");
  const [email] = useState("anuj.mehta@gmail.com");
  const [block] = useState("A");
  const [flat] = useState("101");
  const [password] = useState("password123");
  const [confirmPassword] = useState("password123");
  const [profilePhoto] = useState(null);
  const [documentFile] = useState(null);

  // HOUSE DETAILS
  const [houseOwnership] = useState("Owner");
  const [houseCurrentState] = useState("Residing");
  const [pet] = useState("No");
  const [petType] = useState("");
  const [petDescription] = useState("");

  // VEHICLE
  const [vehicleType] = useState("Car");
  const [vehicleNumber] = useState("GJ05 AB 7890");
  const [vehicleBrand] = useState("Honda City");
  const [vehicleOwner] = useState("Anuj Mehta");
  const [vehicleColor] = useState("White");
  const [manufacturingYear] = useState("2020");
  const [fuelType] = useState("Petrol");
  const [insuranceExpiry] = useState("12/11/2026");
  const [rcExpiry] = useState("15/10/2028");
  const [pollutionExpiry] = useState("05/08/2025");

  // FAMILY MEMBER
  const [familyName] = useState("Riya Mehta");
  const [relation] = useState("Daughter");
  const [gender] = useState("Female");
  const [dob] = useState("18/04/2013");
  const [familyMobile] = useState("9876543210");
  const [familyEmail] = useState("riya.mehta@gmail.com");
  const [familyActive] = useState(true);

  // DOCUMENTS
  const [documentType] = useState("Aadhar");
  const [documentAttachment] = useState("Aadhar_Anuj.pdf");

  // BUSINESS
  const [professionType] = useState("Business");
  const [businessName] = useState("Mehta IT Solutions");
  const [industry] = useState("IT");
  const [businessContact] = useState("9825123456");
  const [businessEmail] = useState("business@mehta.com");
  const [businessDescription] = useState("IT hardware and networking services");
  const [businessAddress] = useState("Shivranjani, Ahmedabad");
  const [pinCode] = useState("380015");

  // ---------------- RENDER TAB CONTENT (READ-ONLY) ----------------
  const renderTabContent = () => {
    const grid = "grid grid-cols-2 gap-6 w-full";

    switch (activeTab) {
      // ---------------- PERSONAL DETAILS --------------------
      case 0:
        return (
          <div className={grid}>
            <ReadOnlyField label="First Name" value={firstName} />
            <ReadOnlyField label="Last Name" value={lastName} />
            <ReadOnlyField
              label="Mobile Number"
              value={`${countryCode} ${mobile}`}
            />
            <ReadOnlyField label="Email" value={email} />
            <ReadOnlyField label="Block" value={block} />
            <ReadOnlyField label="Flat" value={flat} />

            <ReadOnlyField label="Password" value="••••••••" />
            <ReadOnlyField label="Confirm Password" value="••••••••" />

            {/* Profile + Document in row */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {/* Profile Photo */}
              <div>
                <span className="text-[#034175] font-semibold">
                  Profile Photo
                </span>
                <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border bg-gray-100">
                  <img
                    src={
                      profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : images.profileImage
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Document */}
              <div>
                <ReadOnlyField
                  label="Uploaded Document"
                  value={documentFile?.name || "No document uploaded"}
                />
              </div>
            </div>
          </div>
        );

      // ---------------- HOUSE DETAILS --------------------
      case 1:
        return (
          <div className={grid}>
            <ReadOnlyField label="Flat" value={flat} />
            <ReadOnlyField label="Ownership" value={houseOwnership} />
            <ReadOnlyField label="Current State" value={houseCurrentState} />
            <ReadOnlyField label="Have a Pet?" value={pet} />

            {pet === "Yes" && (
              <>
                <ReadOnlyField label="Pet Type" value={petType} />
                <ReadOnlyField label="Description" value={petDescription} />
              </>
            )}
          </div>
        );

      // ---------------- VEHICLE --------------------
      case 2:
        return (
          <div className={grid}>
            <ReadOnlyField label="Vehicle Type" value={vehicleType} />
            <ReadOnlyField label="Vehicle Number" value={vehicleNumber} />
            <ReadOnlyField label="Model/Brand" value={vehicleBrand} />
            <ReadOnlyField label="Owner Name" value={vehicleOwner} />
            <ReadOnlyField label="Colour" value={vehicleColor} />
            <ReadOnlyField
              label="Manufacturing Year"
              value={manufacturingYear}
            />
            <ReadOnlyField label="Fuel Type" value={fuelType} />
            <ReadOnlyField label="Insurance Expiry" value={insuranceExpiry} />
            <ReadOnlyField label="RC Expiry" value={rcExpiry} />
            <ReadOnlyField label="Pollution Expiry" value={pollutionExpiry} />
          </div>
        );

      // ---------------- FAMILY MEMBER --------------------
      case 3:
        return (
          <div className={grid}>
            <ReadOnlyField label="Name" value={familyName} />
            <ReadOnlyField label="Relation" value={relation} />
            <ReadOnlyField label="Gender" value={gender} />
            <ReadOnlyField label="Date of Birth" value={dob} />
            <ReadOnlyField label="Mobile Number" value={familyMobile} />
            <ReadOnlyField label="Email" value={familyEmail} />
            <ReadOnlyField label="Active" value={familyActive ? "Yes" : "No"} />
          </div>
        );

      // ---------------- DOCUMENTS --------------------
      case 4:
        return (
          <div className={grid}>
            <ReadOnlyField label="Document Type" value={documentType} />
            <ReadOnlyField
              label="Attachment"
              value={documentAttachment || "—"}
            />
          </div>
        );

      // ---------------- BUSINESS --------------------
      case 5:
        return (
          <div className={grid}>
            <ReadOnlyField label="Profession Type" value={professionType} />
            <ReadOnlyField label="Business Name" value={businessName} />
            <ReadOnlyField label="Industry" value={industry} />
            <ReadOnlyField label="Contact" value={businessContact} />
            <ReadOnlyField label="Email" value={businessEmail} />
            <ReadOnlyField label="Description" value={businessDescription} />
            <ReadOnlyField label="Address" value={businessAddress} />
            <ReadOnlyField label="Pin Code" value={pinCode} />
          </div>
        );
    }
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="View User Details"
      description="Detailed information of the user."
    >
      <Tabs
        tabs={[
          "Personal Details",
          "House Details",
          "Vehicle",
          "Family Member",
          "Documents",
          "Business",
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

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
          <SaveButton text="Close" />
        </div>
      </div>
    </ModalWrapper>
  );
}
