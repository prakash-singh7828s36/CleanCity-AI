export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost:
      "hover:bg-accent hover:text-accent-foreground",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
