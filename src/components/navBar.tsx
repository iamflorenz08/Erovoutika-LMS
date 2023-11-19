'use client';
import SearchBar from "@/components/searchBar";
import React, { useState } from "react";
import { IoIosNotificationsOutline } from "@react-icons/all-files/io/IoIosNotificationsOutline";
import { IoSearch } from "react-icons/io5";
import ProfileDropDown from "@/app/(main)/dashboard/profileDropDown";
import { AiOutlineMessage } from "react-icons/ai";
import ChatBox from "./chatBox";


export default function NavBar() {
    const [searchText, setSearchText] = useState("");
  
    const handleSearch = (value: string) => {
      setSearchText(value);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatboxOpen(!isChatboxOpen)
  }
  
    return (
      <div className="relative top-0 inset-x-0 overflow-hidden">
      <nav className="h-[60px] sticky top-0 right-0 z-40 flex lg:z-50 items-center justify-end gap-3 pr-3 shadow-sm">

      <div className="md:flex-grow 2xl:max-lg:flex-grow px-6 hidden sm:flex">
      <SearchBar placeholder="Search..."  />
    </div>
  
        <div className="p-2 sm:hidden flex justify-end text-[20px]">
          <IoSearch onClick={handleSearch} />
        </div>
  
        <div className="p-1 text-[25px] text-black bg-white rounded-lg border border-slate-300">
          <IoIosNotificationsOutline />
        </div>
  
        <div className="p-1 text-[25px] text-black bg-white rounded-lg border border-slate-300">
        <AiOutlineMessage onClick={toggleChatBox} />
      </div>
      {isChatboxOpen && <ChatBox onClose={toggleChatBox} />}
  
        <div className="p-1">
          <ProfileDropDown name="John Doe" role="Student" />
        </div>
      </nav>
      </div>
    );
  }
  
  