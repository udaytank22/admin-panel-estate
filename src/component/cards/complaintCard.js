export function ComplaintCard({ item }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">

        {/* LEFT SIDE CONTENT */}
        <div>
          {/* Category */}
          <h3 className="text-lg font-semibold text-[#000000]">
            {item.category}
          </h3>

          {/* User Info */}
          <p className="text-gray-600 mt-1">
            {item.name} • {item.mobile}
          </p>

          {/* House */}
          <p className="text-gray-500 text-sm mt-1">House: {item.house}</p>

          {/* Date */}
          <p className="text-gray-500 text-sm mt-1">Date: {item.date}</p>

          {/* Description */}
          {item.description && (
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* RIGHT SIDE — STATUS */}
        <div className="flex flex-col items-end gap-2">

          {item.status === "In-Progress" && (
            <span className="px-4 py-1 rounded-md bg-blue-100 text-blue-800 font-medium">
              In Progress
            </span>
          )}

          {item.status === "Resolved" && (
            <span className="px-4 py-1 rounded-md bg-green-100 text-green-700 font-medium">
              Resolved
            </span>
          )}

          {item.status === "Rejected" && (
            <span className="px-4 py-1 rounded-md bg-red-100 text-red-700 font-medium">
              Rejected
            </span>
          )}

          {item.status === "Pending" && (
            <div className="flex flex-col gap-2 mt-1">
              <button className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                Approve
              </button>

              <button className="px-5 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
