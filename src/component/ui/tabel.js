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
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, rowsPerPage]);

  const startRecord = (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, data.length);

  return (
    <div className="w-full">

      {/* SEARCH + FILTER + ADD BUTTONS */}
      <div className="flex items-center mb-4">

        {/* SEARCH */}
        <div className="flex items-center  border border-gray-300 rounded-lg px-3 h-12 bg-white">
          <AiOutlineSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            className="ml-2 flex-1 outline-none text-gray-700 text-sm w-[512px]"
          />
        </div>

        {/* FILTER BUTTON */}
        <div className="w-full flex justify-end items-center gap-3">
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

      {/* TABLE */}
      <div className="overflow-hidden border h-auto border-gray-300 rounded-xl pl-3 pt-3">

        {/* HEADER */}
        <div
          className="grid bg-[#034175] text-white h-[56px] items-center text-sm font-semibold px-4"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col, idx) => (
            <div key={idx} className={`${col.center ? "text-center" : ""}`}>
              {col.label}
            </div>
          ))}
        </div>

        {/* ROWS */}
        {paginatedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid border-b border-gray-300 h-[56px] items-center px-4 text-sm"
            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
          >
            {columns.map((col, colIndex) => {
              if (col.field === "action") {
                return (
                  <div key={colIndex} className="flex justify-center gap-4 text-black">
                    {actions && actions(row)}
                  </div>
                );
              }

              return (
                <div
                  key={colIndex}
                  className={`${col.center ? "text-center" : ""}`}
                >
                  {row[col.field]}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      <div className="flex justify-between items-center pt-4 text-sm text-gray-500">

        {/* Rows Per Page */}
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

        {/* Showing X to Y */}
        <div>
          Showing {startRecord} to {endRecord} out of {data.length} records
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            {"<"}
          </button>

          {/* Page buttons */}
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
