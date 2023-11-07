import SearchBar from "@/components/searchBar"
import React, { useState } from 'react';
import { IoIosNotificationsOutline } from '@react-icons/all-files/io/IoIosNotificationsOutline';
import { IoSearch } from 'react-icons/io5'; 
import ProfileDropDown from "./profileDropDown";


export default function NavBar() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value: string) => {
      setSearchText(value);
  
    };
    return(
        <nav className="flex items-center justify-end gap-3">
            <div className="flex-grow px-6 hidden sm:flex">
                <SearchBar
                placeholder="Search..."
             />
            </div>

            <div className="p-2 sm:hidden flex justify-end text-[26px]">
                <IoSearch 
                onClick={handleSearch} />
            </div>

            <div className="p-1 text-[26px] text-black bg-white rounded-lg border">
                <IoIosNotificationsOutline />
            </div>

            <div className="p-1">
            <ProfileDropDown
                name="John Doe"
                role="Student"
            />

            </div>
        </nav>
    )
}