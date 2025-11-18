import React, { useRef } from "react";

export default function UploadFileComponent({
  label = "Attachment",
  onChange = () => {},
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-[5px] w-full">
      {/* LABEL */}
      {label && (
        <label className="text-black text-base font-[16px] leading-6">
          {label}
        </label>
      )}

      {/* UPLOAD BOX */}
      <div
        onClick={handleClick}
        className="
          border border-dashed border-gray-300
          rounded-xl text-center py-3 h-14
          text-blue-500 cursor-pointer
          hover:bg-gray-50 transition
        "
      >
        Upload Image / PDF
      </div>

      {/* HIDDEN INPUT */}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*,.pdf"
        onChange={(e) => onChange(e.target.files[0])}
      />
    </div>
  );
}
