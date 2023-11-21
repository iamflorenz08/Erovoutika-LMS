import React from "react";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";

interface ProfileProps {
  name: string;
  role: string;
}

export default function ProfileDropDown({ name, role }: ProfileProps) {
  return (
    <div className="flex items-center gap-5">
      <FaUserCircle className="text-3xl text-gray" />
      <div className="hidden md:flex  items-center flex-col">
        <h1 className="text-sm font-bold">{name}</h1>
        <span className="text-xs">{role}</span>
      </div>
      <FaChevronDown className="hidden md:block text-2xl text-gray " />
    </div>
  );
}
