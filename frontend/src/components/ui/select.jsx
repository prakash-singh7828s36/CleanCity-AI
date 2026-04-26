export function Select({ label, children, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <select
        className={`w-full px-4 py-2 rounded-xl border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-green-500
        bg-white text-gray-800 transition ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>;
}