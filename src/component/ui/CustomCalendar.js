// src/components/CustomCalendar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GradientLeftArrow,
  GradientRightArrow,
} from "../../assets/Image/images";

// ----- CONSTANTS -----
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CustomCalendar({
  initialDate = new Date(),
  onDateChange = () => { },
}) {
  const monthListRef = useRef(null);
  const yearListRef = useRef(null);

  // For responsive width
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 375
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Equivalent to RN verticalScale values
  const ITEM_HEIGHT = 45; // px
  const VISIBLE_AREA = 300; // px
  const CENTER_OFFSET = VISIBLE_AREA / 2 - ITEM_HEIGHT / 2;

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate));
  const [selected, setSelected] = useState(initialDate);

  const [monthModal, setMonthModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);

  const CURRENT_YEAR = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 101 }, (_, i) => CURRENT_YEAR - 50 + i),
    [CURRENT_YEAR]
  );

  // ------------- CARD WIDTH (responsive, same logic) -------------
  let cardWidth;
  if (windowWidth >= 1000) cardWidth = 600;
  else if (windowWidth >= 768) cardWidth = 500;
  else cardWidth = windowWidth * 0.9;

  const cellSize = Math.floor(cardWidth / 7);

  // ------------- GRID GENERATOR -------------
  const monthGrid = useMemo(() => {
    const first = startOfMonth(currentMonth);
    const firstWeekday = first.getDay();
    const totalDays = daysInMonth(currentMonth);

    const grid = [];

    for (let i = 0; i < firstWeekday; i++) grid.push(null);
    for (let d = 1; d <= totalDays; d++) {
      grid.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }

    while (grid.length < 42) grid.push(null);

    return grid;
  }, [currentMonth]);

  const handleDayPress = (day) => {
    if (!day) return;
    setSelected(day);
    onDateChange(day);
  };

  // ------------- UPDATE MONTH / YEAR -------------
  const changeMonth = (m) => {
    setMonthModal(false);
    setCurrentMonth(new Date(currentMonth.getFullYear(), m, 1));
  };

  const changeYear = (y) => {
    setYearModal(false);
    setCurrentMonth(new Date(y, currentMonth.getMonth(), 1));
  };

  // Scroll selected month into center
  useEffect(() => {
    if (monthModal && monthListRef.current) {
      const index = currentMonth.getMonth();
      const scrollY = index * ITEM_HEIGHT - CENTER_OFFSET;

      monthListRef.current.scrollTo({
        top: scrollY > 0 ? scrollY : 0,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthModal]);

  // Scroll selected year into center
  useEffect(() => {
    if (yearModal && yearListRef.current) {
      const index = years.indexOf(currentMonth.getFullYear());
      const scrollY = index * ITEM_HEIGHT - CENTER_OFFSET;

      yearListRef.current.scrollTo({
        top: scrollY > 0 ? scrollY : 0,
        behavior: "smooth",
      });
    }
  }, [yearModal, years, currentMonth, CENTER_OFFSET]);

  // ---------------------------------------------------------
  return (
    <div
      className="bg-white rounded-xl shadow-sm mx-auto"
      style={{ width: cardWidth }}
    >
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-row justify-between mb-3 px-3 pt-3">
        <div className="flex flex-row items-center gap-2">
          <button
            type="button"
            onClick={() => setMonthModal(true)}
            className="text-[22px] font-extrabold mr-1"
          >
            {MONTHS[currentMonth.getMonth()]}
          </button>

          <button
            type="button"
            onClick={() => setYearModal(true)}
            className="text-[22px] font-extrabold"
          >
            {currentMonth.getFullYear()}
          </button>
        </div>

        <div className="flex flex-row">
          <button
            type="button"
            className="w-[25px] h-[25px] rounded-full bg-[#F1F6FE] flex items-center justify-center ml-2"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
          >
            <GradientLeftArrow width={15} height={15} />
          </button>

          <button
            type="button"
            className="w-[25px] h-[25px] rounded-full bg-[#F1F6FE] flex items-center justify-center ml-2"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
          >
            <GradientRightArrow width={15} height={15} />
          </button>
        </div>
      </div>

      {/* ---------- WEEK HEADER ---------- */}
      <div className="flex flex-row mb-2 px-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            style={{ width: cellSize }}
            className="text-center text-[13px] font-semibold text-[#9CA3AF]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* ---------- DATE GRID ---------- */}
      <div
        className="flex flex-wrap mx-auto pb-3"
        style={{ width: cardWidth }}
      >
        {monthGrid.map((day, index) => {
          const isSelected = day && isSameDay(day, selected);

          return (
            <button
              key={index}
              type="button"
              disabled={!day}
              onClick={() => handleDayPress(day)}
              className="flex items-center justify-center"
              style={{
                width: cellSize,
                height: cellSize,
                cursor: day ? "pointer" : "default",
              }}
            >
              {day ? (
                <div
                  className={`flex items-center justify-center rounded-full w-[70%] h-[70%] ${isSelected ? "bg-[#F1F6FE]" : ""
                    }`}
                >
                  <span
                    className={`text-[16px] ${isSelected
                      ? "text-[#0B3B66] font-bold"
                      : "text-[#111827]"
                      }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ---------------- MONTH PICKER MODAL ---------------- */}
      {monthModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-[70vw] md:w-[40vw] max-w-[400px]">
            <h3 className="text-[18px] font-bold mb-3 text-center">
              Select Month
            </h3>

            <div
              ref={monthListRef}
              style={{ maxHeight: VISIBLE_AREA, overflowY: "auto" }}
            >
              {MONTHS.map((m, idx) => {
                const isSelected = idx === currentMonth.getMonth();
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => changeMonth(idx)}
                    style={{ height: ITEM_HEIGHT }}
                    className={`w-full flex items-center justify-center border-b border-[#E5E7EB] px-2
                      ${isSelected ? "bg-[#E6F0FF] rounded-lg" : ""}`}
                  >
                    <span
                      className={`text-[15px] ${isSelected ? "text-[#0B3B66] font-bold" : "text-[#111]"
                        }`}
                    >
                      {m}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMonthModal(false)}
              className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ---------------- YEAR PICKER MODAL ---------------- */}
      {yearModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-[70vw] md:w-[40vw] max-w-[400px]">
            <h3 className="text-[18px] font-bold mb-3 text-center">
              Select Year
            </h3>

            <div
              ref={yearListRef}
              style={{ maxHeight: VISIBLE_AREA, overflowY: "auto" }}
            >
              {years.map((y) => {
                const isSelected = y === currentMonth.getFullYear();
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => changeYear(y)}
                    style={{ height: ITEM_HEIGHT }}
                    className={`w-full flex items-center justify-center border-b border-[#E5E7EB] px-2
                      ${isSelected ? "bg-[#E6F0FF] rounded-lg" : ""}`}
                  >
                    <span
                      className={`text-[15px] ${isSelected ? "text-[#0B3B66] font-bold" : "text-[#111]"
                        }`}
                    >
                      {y}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setYearModal(false)}
              className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
