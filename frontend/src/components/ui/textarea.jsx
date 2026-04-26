export function Textarea({
  label,
  error,
  helper,
  className = "",
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {/* label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* textarea */}
      <textarea
        className={`
          w-full px-4 py-2.5 rounded-xl border 
          ${error ? "border-red-400" : "border-gray-300"}
          bg-white/80 backdrop-blur-sm
          text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-all duration-200
          resize-none
          ${className}
        `}
        {...props}
      />

      {/* helper text */}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}

      {/* error text */}
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}