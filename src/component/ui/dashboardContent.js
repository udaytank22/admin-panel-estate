import { images } from "../../assets/images";

export function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className="w-[241px] h-[93px] relative bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">

      {/* LEFT CONTENT */}
      <div className="absolute left-4 top-3 flex flex-col gap-2">
        <p className="text-zinc-900 text-sm leading-5">{title}</p>
        <p className="text-zinc-900 text-2xl font-semibold leading-9">
          {value}
        </p>
      </div>

      {/* RIGHT ICON */}
      <div
        className={`w-12 h-12 absolute right-4 top-5 rounded-md flex justify-center items-center ${bgColor}`}
      >
        <img src={icon} alt={title} className="w-7 h-7" />
      </div>
    </div>
  );
}


export default function DashboardContent() {
  return (
    <div className="flex flex-col gap-6">

      {/* ---------------------------------- HERO SECTION ---------------------------------- */}
      <div className="w-full flex gap-6 items-start">

        {/* LEFT – Banner */}
        <div className="w-[78%] rounded-xl overflow-hidden">
          <img
            src={images.buildingBanner}
            alt="building"
            className="w-full h-full object-cover mb-[17px]"
          />

          <div className="grid grid-cols-3 gap-6">

            {/* Total Flat */}
            <StatCard
              title="Total Flat"
              value="100"
              icon={images.building}
              bgColor="bg-orange-400/10"
            />

            <StatCard
              title="Active Residents"
              value="12000"
              icon={images.people}
              bgColor="bg-green-400/10"
            />

            <StatCard
              title="Monthly Revenue"
              value="₹34000"
              icon={images.revenue}
              bgColor="bg-yellow-400/10"
            />

          </div>
        </div>

        {/* RIGHT – Profile Card */}
        <div className="w-[22%]">
          <div className="bg-white rounded-xl shadow-md border p-5 h-[278px] flex flex-col items-center">

            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full bg-blue-50 overflow-hidden mb-3">
              <img
                src={images.profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="text-base font-semibold text-gray-800">
              Anuj Mehta
            </h3>
            <p className="text-xs text-gray-500 mt-1">Sub Admin</p>

            {/* Phone */}
            <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              📞 +91 99251 65555
            </p>

            {/* View More Button */}
            <button className="mt-4 px-4 py-2 bg-[#F5F7FA] rounded-lg text-[#034175] font-medium text-sm flex items-center gap-2 relative group">
              View More
              <img
                src={images.arrow}
                alt="arrow"
                className="w-8 h-8 translate-y-[-2px]"
              />
            </button>

          </div>
        </div>

      </div>

      {/* ------------------------------- COMPLAINT + STAFF ROW ------------------------------- */}
      <div className="grid grid-cols-2 gap-6">

        {/* ----------------------- RECENT COMPLAINT ----------------------- */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] font-semibold text-[#034175] flex items-center gap-1">
              <span className="text-blue-500">•</span> Recent Complaint
            </h3>
            <button className="px-3 py-1 rounded-lg h-[44px] w-[147px] border text-sm text-gray-600 hover:bg-gray-100">
              Last 30 Days ▾
            </button>
          </div>

          {/* Complaint List */}
          <div className="flex flex-col gap-4">
            {["A-101", "A-102", "A-102", "A-102"].map((flat, index) => (
              <div key={index} className="pb-3 border-b last:border-none">
                <p className="font-medium text-gray-900">Water Leakage</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-500 text-sm">Flat: {flat}</p>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFF7E9] cursor-pointer">
                    {/* Yellow Dot */}
                    <span className="w-3 h-3 rounded-full bg-[#F4B63E]"></span>

                    {/* Text */}
                    <span className="text-[#F4B63E] font-medium text-sm">Pending</span>

                    {/* Down Arrow (React Icon) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#F4B63E"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------- STAFF OVERVIEW ----------------------- */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] font-semibold text-[#034175] flex items-center gap-1">
              <span className="text-blue-500 text-[40px]">•</span> Staff Overview
            </h3>
            <button className="px-3 py-1 h-[44px] w-[71px] rounded-lg border text-sm text-gray-600 bg-[rgba(155,155,155,0.1)]">
              Today
            </button>
          </div>

          {/* Staff List */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={images.profileImage}
                    alt="staff"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Ram Kumar</p>
                    <p className="text-sm text-gray-500">Security Guard</p>
                  </div>
                </div>

                <span
                  className="
    h-[32px]
    w-[81px]
    flex
    items-center
    justify-center
    rounded-lg
    bg-[rgba(155,155,155,0.1)]
    text-black
    text-xs
    font-medium
  "
                >
                  Active: Day
                </span>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
