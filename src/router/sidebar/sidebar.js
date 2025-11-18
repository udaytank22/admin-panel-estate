import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../component/ui/header";
import { images } from "../../assets/images";
import { FiChevronDown } from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const sidebarItems = [
    { path: "/dashboard", label: "Dashboard", icon: images.dashboard },
    { path: "/Society", label: "Society Management", icon: images.society },
    { path: "/Users", label: "User Management", icon: images.user },
    {
      path: "/Announcemnt",
      label: "Announcements Management",
      icon: images.announcement,
    },
    { path: "/Reports", label: "Report & Analytics", icon: images.report },

    {
      label: "Events & Amenities",
      icon: images.calender,
      dropdown: true,
      children: [
        {
          path: "/Event",
          label: "Events & Amenities",
          icon: images.calender,
        },
        { path: "/Booking", label: "Booking", icon: images.calender },
      ],
    },

    { path: "/Complaint", label: "Complaints & Requests", icon: images.complaint },
    { path: "/MarketPlace", label: "Marketplace & Jobs", icon: images.account, dropdown: true },
    { path: "/Notification", label: "Notification", icon: images.notification },
  ];

  const gradientText =
    "bg-gradient-to-r from-[#1A4D9E] to-[#4BB6FF] bg-clip-text text-transparent";

  const gradientIcon =
    "w-5 h-5 bg-gradient-to-r from-[#1A4D9E] to-[#4BB6FF] bg-clip-text text-transparent";

  const linkClasses = (isActive) =>
    `flex items-center gap-5 rounded-lg transition-all cursor-pointer
    ${isActive ? "bg-[#F4F7FE] h-[50px] px-4" : "hover:bg-gray-100 h-[40px] px-3"}
  `;

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="w-full h-screen bg-[#F2F5F7] overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* SIDEBAR */}
      <aside
        id="logo-sidebar"
        className="fixed top-24 left-0 z-40 w-64 h-[calc(100vh-6rem)] overflow-y-auto bg-white border-e border-t border-[#E8E8E8]"
      >
        <div className="h-full px-3 py-4 text-[14px] font-inter">

          {/* USER INFO */}
          <div className="flex items-center ps-2.5 mb-5 space-x-3">
            <img src={images.profileImage} className="h-10 rounded-full" />
            <div>
              <p className="text-lg font-semibold">John Deo</p>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>

          {/* MENU ITEMS */}
          <ul className="space-y-6 font-medium">
            {sidebarItems.map((item) => {
              // FIX: Safe check so .toLowerCase() never runs on undefined
              const isActive =
                item.path &&
                location.pathname.toLowerCase() === item.path.toLowerCase();

              return (
                <li key={item.label}>
                  {/* If dropdown → button instead of NavLink */}
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={linkClasses(isActive)}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={isActive ? gradientIcon : "w-5 h-5 text-gray-600"}
                        />
                        <span className={isActive ? gradientText : "text-gray-800"}>
                          {item.label}
                        </span>

                        <span
                          className={`ml-auto transition-transform
                          ${openDropdown === item.label ? "rotate-180" : "rotate-0"}
                          ${isActive ? gradientText : "text-gray-500"}`}
                        >
                          ▼
                        </span>
                      </button>

                      {/* DROPDOWN MENU */}
                      {openDropdown === item.label && (
                        <ul className="ml-10 mt-2 space-y-3">
                          {item.children?.map((child) => {
                            // FIX: safe check
                            const childActive =
                              child.path &&
                              location.pathname.toLowerCase() === child.path.toLowerCase();

                            return (
                              <li key={child.label}>
                                <NavLink
                                  to={child.path}
                                  className={() =>
                                    `flex items-center gap-3 py-1 text-sm ${childActive
                                      ? gradientText
                                      : "text-gray-600 hover:text-black"
                                    }`
                                  }
                                >
                                  {child.icon && (
                                    <img
                                      src={child.icon}
                                      alt={child.label}
                                      className="w-4 h-4"
                                    />
                                  )}
                                  {child.label}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={() => linkClasses(isActive)}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={isActive ? gradientIcon : "w-5 h-5 text-gray-600"}
                      />
                      <span className={isActive ? gradientText : "text-gray-800"}>
                        {item.label}
                      </span>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pt-28 pl-64 h-screen overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
