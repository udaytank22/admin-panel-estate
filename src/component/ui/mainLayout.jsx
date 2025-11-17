import { Outlet } from "react-router-dom";
import SidebarLayout from "../../router/sidebar/sidebar";
import Header from "./header";

export default function MainLayout() {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarLayout />

      <div className="flex flex-col flex-1 bg-[#F5F7FA]">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
