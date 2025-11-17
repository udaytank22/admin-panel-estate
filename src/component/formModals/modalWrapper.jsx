import React from "react";
import { images } from "../../assets/images";

export default function ModalWrapper({
  open,
  onClose,
  title = "",
  description,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-6xl rounded-xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="px-8 py-5">
          <div className="flex justify-between items-center">
            {/* LEFT: Arrow + Title + Description */}
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={images.leftArrow}
                  className="w-7 h-7 cursor-pointer"
                  onClick={onClose}
                />
                <h2 className="text-xl font-semibold text-[#1A1A1A]">
                  {title}
                </h2>
              </div>

              {description && (
                <p className="text-gray-500 text-sm mt-1">{description}</p>
              )}
            </div>

            {/* RIGHT: Button */}
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
          <div className="border-b border-gray-200 py-3"></div>
        </div>

        {/* CONTENT */}
        <div className="px-8 pb-6">{children}</div>
      </div>
    </div>
  );
}
