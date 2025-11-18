export function BookingCard({ item }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        {/* LEFT SIDE */}
        <div>
          <h3 className="text-lg font-semibold text-[#000000]">{item.amenity}</h3>

          <p className="text-gray-600 mt-1">
            {item.name} | {item.mobile}
          </p>
          <p className="text-gray-500 text-sm mt-1">House: {item.house}</p>

          <p className="text-gray-500 text-sm mt-1">
            Date: {item.date} | Time: {item.time}{" "}
          </p>
          <p className="text-gray-500 text-sm mt-1">Reason: {item.reason}</p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          {item.status === "Pending" && (
            <>
              <button className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                Approve
              </button>

              <button className="px-5 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700">
                Reject
              </button>
            </>
          )}

          {item.status === "Approved" && (
            <span className="px-4 py-1 rounded-md bg-green-100 text-green-700 font-medium">
              Approved
            </span>
          )}

          {item.status === "Rejected" && (
            <span className="px-4 py-1 rounded-md bg-red-100 text-red-700 font-medium">
              Rejected
            </span>
          )}

          {item.status === "Canceled" && (
            <span className="px-4 py-1 rounded-md bg-gray-200 text-gray-600 font-medium">
              Canceled
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
