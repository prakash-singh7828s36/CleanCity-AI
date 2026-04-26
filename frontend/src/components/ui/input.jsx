export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <input
        className={`w-full px-4 py-2 rounded-xl border 
        ${error ? "border-red-400" : "border-gray-300"}
        focus:outline-none focus:ring-2 focus:ring-green-500 
        bg-white text-gray-800 placeholder-gray-400 transition
        ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}