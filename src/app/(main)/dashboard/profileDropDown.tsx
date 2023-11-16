import React from "react";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { RiArrowDropDownLine } from "react-icons/ri";

interface ProfileProps {
  name: string;
  role: string;
}

export default function ProfileDropDown({ name, role }: ProfileProps) {
  return (
    <div className="flex items-center">
      <FaUserCircle className="text-3xl text-gray mr-4" />
      <div className="relative">
        <h1 className="hidden md:block text-sm font-bold mr-4">{name}</h1>
        <span className="hidden md:block text-xs">{role}</span>
        <RiArrowDropDownLine className="text-[50px] absolute top-1/3 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray" />
      </div>
    </div>
  );
}
