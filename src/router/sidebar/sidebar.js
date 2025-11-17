import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../../component/ui/header";
import { images } from "../../assets/images";

export default function SidebarLayout() {
  const location = useLocation();

  const sidebarItems = [
    { path: "/dashboard", label: "Dashboard", icon: images.dashboard },
    { path: "/Society", label: "Society Management", icon: images.society },
    { path: "/Users", label: "User Management", icon: images.user },
    { path: "/Announcemnt", label: "Announcements Management", icon: images.announcement },
    { path: "/Reports", label: "Report & Analytics", icon: images.report },
    { path: "/Event", label: "Events & Amenities", icon: images.calender, dropdown: true },
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
    ${isActive
      ? "bg-[#F4F7FE] h-[50px] px-4"
      : "hover:bg-gray-100 h-[40px] px-3"
    }
    flex
  `;


  return (
    <div className="min-h-screen w-full bg-[#F2F5F7]">
      <Header />

      {/* SIDEBAR */}
      <aside
        id="logo-sidebar"
        className="fixed top-24 left-0 z-40 h-[calc(100vh-6rem)] transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-e border-t border-[#E8E8E8] text-[14px] font-inter">

          {/* USER INFO */}
          <div className="flex items-center ps-2.5 mb-5 space-x-3">
            <img
              src={images.profileImage}
              className="h-10 rounded-full"
              alt="User Avatar"
            />
            <div>
              <p className="text-lg font-semibold text-heading">John Deo</p>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>

          {/* MENU ITEMS */}
          <ul className="space-y-6 font-medium">
            {sidebarItems.map((item) => {
              const isActive =
                location.pathname.toLowerCase() === item.path.toLowerCase();

              return (
                <li key={item.path}>
                  <NavLink to={item.path} className={() => linkClasses(isActive)}>

                    {/* ICON */}
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={isActive ? gradientIcon : "w-5 h-5 text-gray-600"}
                    />

                    {/* LABEL */}
                    <span
                      className={isActive ? gradientText : "text-gray-800"}
                    >
                      {item.label}
                    </span>

                    {/* DROPDOWN ARROW */}
                    {item.dropdown && (
                      <span
                        className={`ml-auto ${isActive ? gradientText : "text-gray-500"
                          }`}
                      >
                        ^
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-[50px] sm:ml-64">
        <div className="p-4 border-1 border-default border-dashed rounded-base">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
