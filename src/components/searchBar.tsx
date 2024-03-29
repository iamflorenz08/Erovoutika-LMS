import React, { ChangeEvent } from 'react';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';

interface SearchBarProps {
  placeholder: string;

}

const SearchBar = ({ placeholder }: SearchBarProps) => {


  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder={placeholder}
        className="sm:min-w-[200px] sm:max-w-[500px] w-full md:w-1/3 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-primary border border-slate-300"
      />
      <div className="absolute left-3 top-2">
        <IoSearch className="h-6 w-6 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
