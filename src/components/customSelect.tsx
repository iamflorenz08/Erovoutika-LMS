"use client";
import useDropDown from "@/hooks/useDropDown";
import { IoCaretDown } from "@react-icons/all-files/io5/IoCaretDown";
import { useEffect, useRef, useState } from "react";

export interface ISelectOption {
  icon?: any;
  value?: string;
  text?: string;
}
interface IProps {
  className?: string;
  onChange?: (value: string | undefined) => void;
  options?: Array<ISelectOption>;
}
export default function CustomSelect({ className, options, onChange }: IProps) {
  const drop = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(false, drop);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange && options && onChange(options[index].value);
    setIsOpen(false);
  };

  return (
    <div ref={drop} className={`relative w-full  ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-border px-4 py-2 flex items-center justify-between rounded w-full"
      >
        <div className="flex gap-2">
          <span className="text-[#7B7B7B]">
            {options?.[selectedIndex]?.icon}
          </span>
          <h1 className="text-[#7B7B7B] font-medium">
            {options?.[selectedIndex]?.text}
          </h1>
        </div>
        <span>
          <IoCaretDown size={18} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-border bg-white shadow-md drop-shadow-md w-cotent w-full rounded">
          <ul>
            {options &&
              options.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleChange(index)}
                    className="px-4 py-2 w-full text-left hover:bg-gray hover:bg-opacity-10"
                  >
                    <span>{option?.icon}</span>
                    <span>{option?.text}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
