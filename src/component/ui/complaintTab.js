export default function PillTabs({ active, onChange, tabs }) {
  return (
    <div className="w-full bg-white rounded-xl p-2 flex items-center gap-2 border border-gray-200">
      {tabs.map((tab, index) => {
        const isActive = active === tab;

        return (
          <button
            key={index}
            onClick={() => onChange(tab)}
            className={`
              flex-1 h-12 flex items-center justify-center rounded-lg text-base font-medium transition-all
              ${isActive
                ? "bg-[#EAF5FF] text-[#034175]" // Active
                : "text-[#1A1A1A] hover:bg-gray-50" // Inactive
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
