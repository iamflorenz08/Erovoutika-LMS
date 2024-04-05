"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
interface IProps {
  courseId: string;
}

export default function Navigation({ courseId }: IProps) {
  const segment = useSelectedLayoutSegment();
  
  const navigations = [
    {
      label: "Details",
      segment: "/details",
      isActive: segment === "details",
    },
    {
      label: "Acquired Skills",
      segment: "/acquired-skills",
      isActive: segment === "acquired-skills",
    },
    {
      label: "Navigation",
      segment: "/navigation",
      isActive: segment === "navigation",
    },
    {
      label: "Pricing & discount",
      segment: "/pricing",
      isActive: segment === "pricing",
    },
  ];

  return (
    <nav>
      <ul className="flex">
        {navigations.map((navigation, index) => (
          <li
            key={index}
            className={`w-full ${
              navigation.isActive && "!border-primary-light"
            } border-b-2 border-slate-300 hover:border-primary-light`}
          >
            <Link
              className={`flex justify-center py-2 border-b-[2px] border-transparent hover:border-primary-light font-medium text-xl text-gray ${
                navigation.isActive && "!text-black !border-primary-light"
              }`}
              href={"/course-creation/" + courseId + navigation.segment}
            >
              {navigation.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
