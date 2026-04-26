import { useState } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children, onClick }) {
  return <div onClick={onClick}>{children}</div>;
}

export function DropdownMenuContent({ open, children }) {
  if (!open) return null;

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator() {
  return <div className="h-px bg-gray-200 my-1" />;
}

export function DropdownMenuLabel({ children }) {
  return (
    <div className="px-4 py-2 text-xs text-gray-500">
      {children}
    </div>
  );
}