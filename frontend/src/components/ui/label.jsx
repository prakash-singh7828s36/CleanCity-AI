export function Label({
  children,
  required,
  className = "",
  ...props
}) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 flex items-center gap-1 ${className}`}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 text-xs">*</span>
      )}
    </label>
  );
}