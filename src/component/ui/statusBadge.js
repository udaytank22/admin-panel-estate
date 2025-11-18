import { FiChevronDown } from "react-icons/fi";

export default function StatusBadge({ status }) {
  const statusStyles = {
    Pending: {
      bg: "bg-orange-50",
      dot: "bg-orange-400",
      text: "text-orange-500",
    },
    "In-Progress": {
      bg: "bg-blue-50",
      dot: "bg-blue-400",
      text: "text-blue-600",
    },
    Resolved: {
      bg: "bg-green-50",
      dot: "bg-green-400",
      text: "text-green-600",
    },
    Rejected: {
      bg: "bg-red-50",
      dot: "bg-red-400",
      text: "text-red-600",
    },
  };

  const style = statusStyles[status] || statusStyles["Pending"];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${style.bg} ${style.text} text-sm font-medium`}
    >
      {/* DOT */}
      <span className={`w-3 h-3 rounded-full ${style.dot}`} />

      {/* TEXT */}
      <span>{status}</span>

      {/* ICON */}
      <FiChevronDown size={16} className={`${style.text}`} />
    </div>
  );
}
