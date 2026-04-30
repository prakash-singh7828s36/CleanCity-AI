import { Leaf, Trash2, Recycle, AlertCircle } from "lucide-react";

export const WasteClassifier = ({ className = "" }) => {
  const wasteTypes = [
    { icon: Recycle, label: "Recyclable", color: "text-blue-400" },
    { icon: Leaf, label: "Organic", color: "text-green-400" },
    { icon: Trash2, label: "Hazardous", color: "text-red-400" },
    { icon: AlertCircle, label: "Other", color: "text-yellow-400" },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {wasteTypes.map((type) => (
        <div
          key={type.label}
          className="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg glass-soft"
        >
          <type.icon className={`w-5 h-5 ${type.color}`} />
          <span className="text-xs text-white/70">{type.label}</span>
        </div>
      ))}
    </div>
  );
};
