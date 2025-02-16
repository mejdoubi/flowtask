import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

const SelectInput = ({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
}: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [isOpen]);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <label className="block font-bold text-text-primary" htmlFor={id}>
        {label}
      </label>
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <input
          ref={inputRef}
          id={id}
          data-testid={id}
          type="text"
          value={options.find((option) => option.value === value)?.label || ""}
          readOnly
          className="w-full p-2 border rounded text-text-primary border-border cursor-pointer"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-text-primary" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-text-primary" />
          )}
        </span>
      </div>
      {isOpen && (
        <ul
          className="absolute text-text-primary bg-white border border-border rounded shadow-lg"
          style={{ width: inputWidth }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
