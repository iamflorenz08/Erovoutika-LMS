'use client';
import { RiDashboardLine } from '@react-icons/all-files/ri/RiDashboardLine';
import { CgNotes } from '@react-icons/all-files/cg/Cgnotes';
import { BiBookmarkMinus } from '@react-icons/all-files/bi/BiBookmarkMinus';
import { FiInbox } from '@react-icons/all-files/fi/FiInbox';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar';
import { FaBookReader } from '@react-icons/all-files/fa/FaBookReader';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings';
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { useSelectedLayoutSegment } from "next/navigation"
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join('');
}

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const segment = useSelectedLayoutSegment();

  const sidebarPages = [
    { name: "Dashboard", href: "/dashboard", icon: <RiDashboardLine />, current: !segment ? true : false },
    { name: "Course", href: "/course", icon: <CgNotes />, current: `/${segment}` == "/course" ? true : false },
    { name: 'Forum', href: "/forum", icon: <BiBookmarkMinus />, current: `/${segment}` == "/forum" ? true : false },
    { name: 'Calendar', href: "/calendar", icon: <BsCalendar />, current: `/${segment}` == "/calendar" ? true : false },
    { name: 'Account', href: "/account", icon: <FaBookReader />, current: `/${segment}` == "/account" ? true : false },
    { name: 'Settings', href: "/settings", icon: <FiSettings />, current: `/${segment}` == "/settings" ? true : false }
  ]



  return (
    <div className="flex grow flex-col">
      <button className="absolute top-0 left-0 md:hidden lg:hidden text-[30px] m-4 pt-3 pr-4" onClick={toggleMenu}>
        {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      <nav className={`md:flex lg:flex grow flex-col gap-y-5 overflow-y-auto px-8 pb-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className='flex h-16 shrink-0 items-center'>
          <h1>Logo</h1>
        </div>
        <ul role="list" className="flex flex-1 flex-col gap-y-4 p-4">
          <li>
            <ul role="list" className="-mx-2 space-y-6">
              {sidebarPages.map((option, index) => (
                <li key={option.name}>
                  <Link
                    href={option.href}
                    className={classNames(
                      option.current ? 'bg-primary text-white m-2' : 'text-[#A3AED0] hover:text-primary hover:primary',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <div className="text-2xl group-hover:text-primary h-6 w-6">
                      {option.icon}
                    </div>
                    <div className="text-[16px]">{option.name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;