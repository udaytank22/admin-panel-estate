import { FiEye, FiTrash2 } from "react-icons/fi";
import { TbCircleOff } from "react-icons/tb";
import DataTable from "../../component/ui/tabel";
import { useEffect, useState } from "react";
import AddUserModal from "../../component/formModals/addUserModal";
import { PeopleData } from "../../services/user/userService";
import { formatString } from "../../utils/strings/stringFormat";
import ViewUserDetails from "../../component/formModals/viewUserModal";

export default function Users() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await PeopleData();
      setUserList(response?.results || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formattedUsers = userList.map((user) => ({
    name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
    email: user.email || "-",
    role: formatString(user.role) || "-",
    status: user.is_active ? "Active" : "Inactive",
    raw: user, // (optional) keep full object for actions
  }));

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
            data={formattedUsers.filter((u) =>
              u?.name?.toLowerCase().includes(search.toLowerCase())
            )}
            isLoading={loading}
            onSearch={(value) => setSearch(value)}
            onFilter={() => setOpenFilterModal(true)}
            onAdd={() => setOpenAddModal(true)}
            addButtonText="Add New User"
            actions={(row) => (
              <div className="flex gap-4 justify-center">
                <button className="text-black">
                  <FiEye
                    size={18}
                    onClick={() => {
                      setSelectedUser(row.raw);
                      setOpenViewModal(true);
                    }}
                  />
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
      <ViewUserDetails
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        user={selectedUser}
      />
    </>
  );
}
