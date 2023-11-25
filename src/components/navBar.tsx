'use client';
import SearchBar from "@/components/searchBar";
import React, { useState } from "react";
import { IoIosNotificationsOutline } from "@react-icons/all-files/io/IoIosNotificationsOutline";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import ProfileDropDown from "@/app/(main)/dashboard/profileDropDown";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
import ChatBox from "./chatBox";


export default function NavBar() {
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleChatBox = () => {
    setIsChatboxOpen(!isChatboxOpen)
  }

  return (
    <nav className="z-40 flex lg:z-50 items-center gap-2 px-6 py-9 justify-end">
      <div className="md:flex-grow 2xl:max-lg:flex-grow hidden sm:flex">
        <SearchBar placeholder="Search..." />
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
  );
}

