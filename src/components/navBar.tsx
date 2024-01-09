'use client';
import SearchBar from "@/components/searchBar";
import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "@react-icons/all-files/io/IoIosNotificationsOutline";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import ProfileDropDown from "@/app/(main)/dashboard/profileDropDown";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
import ChatBox from "./chat/chatBox";
import { signIn, useSession } from "next-auth/react";
import SocketIO from "@/utils/socketIo";


export default function NavBar() {
  const { data, status } = useSession()
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') return
    SocketIO.connect()
    SocketIO.on('connect', () => {
      SocketIO.emit('userConnects', { userId: data?.user._id, socketId: SocketIO.id })
    })
    return () => {
      SocketIO.disconnect()
    }
  }, [status])


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

      {status === 'loading' ? 'Loading' : status === 'authenticated' ? (
        <>
          <div className="p-1 text-[25px] text-black bg-white rounded-lg border border-slate-300">
            <IoIosNotificationsOutline />
          </div>

          <div className="p-1 text-[25px] text-black bg-white rounded-lg border border-slate-300">
            <AiOutlineMessage onClick={toggleChatBox} />
          </div>

          {isChatboxOpen && <ChatBox onClose={toggleChatBox} />}

          <div className="p-1">
            <ProfileDropDown
              data={data}
            />
          </div>
        </>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => signIn()}
            className="text-lg px-4 py-1 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white bg-opacity-80 duration-300">
            Log in
          </button>
          <button className="text-lg px-4 py-1 bg-primary text-white rounded-full hover:bg-opacity-80 duration-300">Sign up</button>
        </div>
      )}

    </nav>
  );
}

