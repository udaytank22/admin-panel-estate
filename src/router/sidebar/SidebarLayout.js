import Header from "../../component/ui/header";
import Sidebar from "./sidebar";

export default function SidebarLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">

      {/* ------------ FIXED SIDEBAR ------------ */}
      <aside className="w-[240px] h-full fixed left-0 top-0 bg-white border-r shadow-sm z-50">
        <Sidebar />
      </aside>

      {/* ------------ RIGHT SIDE WRAPPER ------------ */}
      <div className="flex flex-col flex-1 ml-[240px] h-full">

        {/* ------------ FIXED HEADER ------------ */}
        <header className="h-[70px] fixed top-0 left-[240px] right-0 bg-white shadow-sm border-b z-40 flex items-center">
          <Header />
        </header>

        {/* ------------ SCROLLABLE PAGE CONTENT ------------ */}
        <main className="mt-[70px] h-[calc(100vh-70px)] overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
