"use client";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CreateCourseButton() {
  const path = usePathname();
  return (
    <Link
      href={path + "?create=1"}
      className="bg-slate-100 flex justify-center items-center rounded-md w-6 h-6"
    >
      <FiPlus size={10} />
    </Link>
  );
}
