export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md border border-gray-200 
      rounded-2xl shadow-sm hover:shadow-md transition p-5 ${className}`}
    >
      {children}
    </div>
  );
}