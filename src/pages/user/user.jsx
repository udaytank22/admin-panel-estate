import { FiEye, FiTrash2 } from "react-icons/fi";
import { TbCircleOff } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import DataTable from "../../component/ui/tabel";
import { images } from "../../assets/images";
import { useState } from "react";
import AddUserModal from "../../component/formModals/addUserModal";
import { strings } from "../../utils/strings/strings";

export default function Users() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [search, setSearch] = useState("");

  const userList = [
    {
      id: 1,
      name: "Atash Jain",
      email: "atash@mail.com",
      role: "Member",
      status: "Active",
    },
    {
      id: 2,
      name: "Raj Patel",
      email: "raj@mail.com",
      role: "Member",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mr Roy",
      email: "roy@mail.com",
      role: "Security",
      status: "Active",
    },
  ];

  const columns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role", center: true },
    { label: "Status", field: "status", center: true },
    { label: "Actions", field: "action", center: true },
  ];

  return (
    <>
      <div>
        {/* PAGE TITLE */}
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            User Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          {/* REUSABLE DATATABLE */}
          <DataTable
            columns={columns}
            data={userList.filter((u) =>
              u.name.toLowerCase().includes(search.toLowerCase())
            )}
            onSearch={(value) => setSearch(value)}
            onFilter={() => setOpenFilterModal(true)}
            onAdd={() => setOpenAddModal(true)}
            addButtonText="Add New User"
            actions={(row) => (
              <div className="flex gap-4 justify-center">
                <button className="text-black">
                  <FiEye size={18} />
                </button>
                <button className="text-black">
                  <TbCircleOff size={18} />
                </button>
                <button className="text-black">
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
          />
        </div>
      </div>

      {/* ADD USER MODAL */}
      <AddUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      {/* FILTER MODAL (optional) */}
      {/* <FilterModal open={openFilterModal} onClose={() => setOpenFilterModal(false)} /> */}
    </>
  );
}
