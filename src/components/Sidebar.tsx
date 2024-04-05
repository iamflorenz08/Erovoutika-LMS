"use client";
import { RiDashboardLine } from "@react-icons/all-files/ri/RiDashboardLine";
import { CgNotes } from "@react-icons/all-files/cg/Cgnotes";
import { BiBookmarkMinus } from "@react-icons/all-files/bi/BiBookmarkMinus";
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { FaBookReader } from "@react-icons/all-files/fa/FaBookReader";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join("");
}

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getRole = () => {
    return "learner";
  };

  const sidebarPages = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <RiDashboardLine />,
      current: segment === "dashboard" || segment === null,
      role: ["learner", "instructor", "admin"],
    },
    {
      name: "Course Management",
      href: "/course-management",
      icon: <RiDashboardLine />,
      current: segment === "course-management",
      role: ["instructor"],
    },
    {
      name: "Course Creation",
      href: "/course-creation",
      icon: <RiDashboardLine />,
      current: segment === "course-creation",
      role: ["admin"],
    },
    {
      name: "Users",
      href: "/users",
      icon: <RiDashboardLine />,
      current: segment === "users",
      role: ["admin"],
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <RiDashboardLine />,
      current: segment === "reports",
      role: ["admin"],
    },
    {
      name: "Course",
      href: "/course",
      icon: <CgNotes />,
      current: segment === "course",
      role: ["learner"],
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <BsCalendar />,
      current: segment === "calendar",
      role: ["learner"],
    },
    {
      name: "Forum",
      href: "/forum",
      icon: <BiBookmarkMinus />,
      current: segment === "forum",
      role: ["learner", "instructor", "admin"],
    },
  ];

  return (
    <div className="lg:sticky top-0 left-0 right-0 flex grow flex-col">
      <button
        className="absolute top-0 left-0 md:hidden lg:hidden text-[30px] m-4 pt-0 pr-4"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      <nav
        className={`md:flex lg:flex grow flex-col gap-y-5 overflow-y-auto px-8 pb-4  min-w-[288px]  ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-center text-2xl font-bold text-primary">
          <h1>EroHub</h1>
        </div>

        <ul role="list" className="flex flex-1 flex-col gap-y-4 p-4">
          <li>
            <ul role="list" className="-mx-2 space-y-6">
              {sidebarPages.map(
                (option, index) =>
                  option.role.includes(getRole()) && (
                    <li key={index}>
                      <Link
                        href={option.href}
                        className={classNames(
                          option.current
                            ? "bg-primary text-white m-2"
                            : "text-[#A3AED0] hover:text-primary hover:primary",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <div className="text-2xl group-hover:text-primary h-6 w-6">
                          {option.icon}
                        </div>
                        <div className="text-[16px]">{option.name}</div>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
