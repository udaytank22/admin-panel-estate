
import React, { useState, useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { images } from "../../assets/images";

export default function DataTable({
  columns = [],
  data = [],
  actions = null,
  onSearch = () => { },
  onFilter = () => { },
  onAdd = () => { },
  addButtonText = "Add New",
  showAddButton = true,
  showFilterButton = true,
  extraActions = null,
  isLoading = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const startRecord = (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, data.length);

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <div className="flex w-[470px] items-center border border-gray-300 rounded-lg px-3 h-12 bg-white">
          <AiOutlineSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            className="ml-2 flex-1 outline-none text-gray-700 text-sm"
          />
        </div>

        <div className="w-full flex justify-end items-center gap-3">
          {extraActions && (
            <div className="flex items-center gap-3">{extraActions}</div>
          )}

          {showFilterButton && (
            <button
              onClick={onFilter}
              className="flex items-center gap-2 border border-gray-300 px-4 h-12 rounded-lg hover:bg-gray-50"
            >
              <img src={images.filter} alt="filter" className="w-5 h-5" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          )}

          {showAddButton && (
            <button
              onClick={onAdd}
              className="h-12 px-5 bg-gradient-to-l from-sky-400 to-sky-900
              rounded-[10px] flex items-center gap-2.5 shadow text-white"
            >
              <img src={images.add} alt="add" className="w-5 h-5" />
              <span className="text-base font-medium">{addButtonText}</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden border border-gray-300 rounded-xl pl-3 pt-3">
        <div
          className="grid bg-[#034175] text-white h-[56px] items-center text-sm font-semibold px-4"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          }}
        >
          {columns.map((col, idx) => (
            <div key={idx} className={`${col.center ? "text-center" : ""}`}>
              {col.label}
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#034175] rounded-full"></div>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            No records found
          </div>
        ) : (
          paginatedData.map((row, i) => (
            <div
              key={i}
              className="grid border-b border-gray-300 min-h-[56px] items-start px-4 py-2 text-sm"
              style={{
                gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              }}
            >
              {columns.map((col, j) => {
                if (col.field === "action") {
                  return (
                    <div key={j} className="flex justify-center gap-4">
                      {actions ? actions(row, i) : null}
                    </div>
                  );
                }


                if (col.render) {
                  return (
                    <div key={j} className={`${col.center ? "text-center" : ""}`}>
                      {col.render(row)}
                    </div>
                  );
                }

                return (
                  <div
                    key={j}
                    className={`${col.center ? "text-center" : ""}
                      ${col.field === "title"
                        ? "line-clamp-2 break-words max-w-[350px] leading-5"
                        : ""
                      }`}
                  >
                    {row[col.field]}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center pt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          Showing
          <select
            className="border rounded-lg px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>

        <div>
          Showing {startRecord} to {endRecord} out of {data.length} records
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded-lg ${currentPage === index + 1
                ? "border-sky-600 text-sky-600"
                : ""
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
