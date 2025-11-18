import React, { useState } from "react";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/fa";
import CustomCalendar from "../ui/CustomCalendar";

export default function DatePickerComponent({
  label,
  value,
  error,
  onChange,
  mode = "date", // date | time | datetime
  returnFormat = "date",
  isRequired = false,
  placeholder,
}) {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const defaultPlaceholder =
    placeholder || (mode === "time" ? "Select Time" : "Select Date");

  const getPickerDate = () => {
    if (!value) return new Date();

    if (moment(value, "DD-MM-YYYY", true).isValid()) {
      return moment(value, "DD-MM-YYYY").toDate();
    }

    if (moment(value).isValid()) {
      return moment(value).toDate();
    }

    return new Date();
  };

  const handleFinalChange = (dateObj) => {
    if (mode === "time") {
      onChange(moment(dateObj).format("HH:mm:ss"));
      return;
    }

    if (returnFormat === "timestamp") {
      onChange(dateObj.getTime());
    } else {
      onChange(moment(dateObj).format("DD-MM-YYYY"));
    }
  };

  const displayValue =
    mode === "time"
      ? value
      : mode === "datetime"
      ? moment(value).format("DD-MM-YYYY HH:mm")
      : value
      ? moment(value).format("DD-MM-YYYY")
      : "";

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Label */}
      {label && (
        <p className="text-sm font-semibold text-gray-800">
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </p>
      )}

      {/* Input */}
      <button
        onClick={() => {
          if (mode === "time") {
            setSelectedDate(new Date());
            setOpenTimeModal(true);
            return;
          }
          const date = getPickerDate();
          setSelectedDate(date);
          setOpenDateModal(true);
        }}
        className="h-12 px-4 rounded-lg border border-gray-300 bg-white flex items-center justify-between cursor-pointer hover:border-blue-500 transition"
      >
        <span className={displayValue ? "text-black" : "text-gray-400"}>
          {displayValue || defaultPlaceholder}
        </span>

        <FaRegCalendarAlt className="text-gray-600 text-lg" />
      </button>

      {/* DATE MODAL */}
      {openDateModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-5 w-[350px] shadow-xl">
            <CustomCalendar
              initialDate={selectedDate}
              onDateChange={(d) => {
                setSelectedDate(d);
                handleFinalChange(d);
                setOpenDateModal(false);

                if (mode === "datetime") {
                  setTimeout(() => setOpenTimeModal(true), 200);
                }
              }}
            />

            <button
              onClick={() => setOpenDateModal(false)}
              className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TIME MODAL */}
      {/*       {openTimeModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-5 w-[350px] shadow-xl">
            <CustomTimePicker
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />

            <button
              onClick={() => {
                handleFinalChange(selectedDate);
                setOpenTimeModal(false);
              }}
              className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold"
            >
              Confirm
            </button>

            <button
              onClick={() => setOpenTimeModal(false)}
              className="mt-2 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
