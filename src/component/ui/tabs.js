export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab, index) => {
        const isActive = active === index;

        return (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`
              px-8 py-3 rounded-[5px]
              text-base font-medium
              transition-all duration-150
              ${isActive
                ? "bg-gradient-to-l from-sky-400 to-sky-900 text-white"
                : "bg-[#75BFFE2E] text-[#1A1A1A]" // 18% opacity
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
