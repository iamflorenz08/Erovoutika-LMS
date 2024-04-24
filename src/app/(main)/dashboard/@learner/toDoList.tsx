"use client";
import { HiPlus } from "@react-icons/all-files/hi/HiPlus";
const ToDoListContainer = () => {
  return (
    <div className="flex flex-col h-[400px] bg-white rounded-lg border border-gray border-opacity-20">
      <div className="flex justify-between items-center p-4">
        <h1 className="font-bold text-xl">To do List</h1>
        <button className="w-6 h-6 bg-slate-100 flex justify-center items-center rounded-md">
          <HiPlus size={15} />
        </button>
      </div>

      <div className="flex flex-col gap-4 h-full overflow-auto">
        <div className="flex justify-center items-center text-gray h-full">Empty</div>
        {/* <label
          htmlFor="listOne"
          className="flex items-center gap-9 hover:bg-slate-100 px-4 py-1 cursor-pointer duration-300"
        >
          <input
            type="checkbox"
            id="listOne"
            className="checkbox checkbox-sm [--chkbg:#00008B]"
          />
          <div className="flex flex-col">
            <label
              htmlFor="listOne"
              className="text-[#121212] font-bold text-[16px]"
            >
              Deploy with Firebase
            </label>
            <label htmlFor="listOne" className="text-[12px] text-[#41475E]">
              Tuesday, 29 June 2023
            </label>
          </div>
        </label> */}
      </div>
    </div>
  );
};

export default ToDoListContainer;
