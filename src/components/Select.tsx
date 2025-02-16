import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"; // Import icons from Heroicons

interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const Select = ({ id, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <input
          id={id}
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
        <ul className="absolute w-full text-text-primary bg-white border border-border rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="p-2  hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
