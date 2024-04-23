"use client";
import { ISelectOption } from "@/components/customSelect";
import useDropDown from "@/hooks/useDropDown";
import { useRef, useState } from "react";
import { MdArrowDropDown } from "@react-icons/all-files/md/MdArrowDropDown";
import { IUser } from "@/types/userTypes";
import { updateRole } from "./action";

interface IProps {
  userId?: string;
  role?: string;
}

const options: Array<ISelectOption> = [
  {
    text: "Learner",
    value: "learner",
  },
  {
    text: "Instructor",
    value: "instructor",
  },
  {
    text: "Admin",
    value: "admin",
  },
];

export default function ChangeRole({ role, userId }: IProps) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(false, dropdownRef);
  const [selectedText, setSelectedText] = useState<string>(
    role ?? options[0].text ?? ""
  );

  const handleUpdateRole = async (role: string | undefined) => {
    if (!role) return;
    setSelectedText(role);
    setIsOpen(false);
    await updateRole(userId, role);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="capitalize flex items-center gap-2"
      >
        {selectedText} <MdArrowDropDown />
      </button>
      {isOpen && (
        <div className="absolute left-0 bg-white shadow-md z-50">
          {options.map((option, index) => (
            <button
              onClick={() => handleUpdateRole(option.value)}
              key={index}
              className="px-4 py-2"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
