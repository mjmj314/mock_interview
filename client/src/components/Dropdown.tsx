import { useEffect, useRef, useState } from "react";

export interface DropdownOption<T extends string = string> {
  label: string;
  value: T;
}

interface DropdownProps<T extends string> {
  options: DropdownOption<T>[];
  value: T | "";
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  className = "",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative w-56 ${className}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 shadow-sm transition hover:border-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <span className={selected ? "" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-indigo-50 ${
                    isSelected
                      ? "bg-indigo-50 font-medium text-indigo-700"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                  {isSelected && (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
