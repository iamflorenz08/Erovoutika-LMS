
const ToDoListContainer = () => {
  return (
    <div
      className="flex flex-col w-[432px] h-[552px] bg-white rounded-lg shadow-md">
      <h1 className="py-[24px] px-[32px] font-bold text-[34px]">To do List</h1>

      <label htmlFor="listOne" className="flex items-center px-[32px] gap-5 border-b border-[#ECECEC] pb-[14px] pt-[10px]">
        <input type="checkbox" id="listOne" className="" />
        <div className="flex flex-col">
          <label htmlFor="listOne" className="text-[#121212] font-bold text-[16px]">Deploy with Firebase</label>
          <label htmlFor="listOne" className="text-[12px] text-[#41475E]">Tuesday, 29 June 2023</label>
        </div>
      </label>

      <label htmlFor="listTwo" className="flex items-center px-[32px] gap-5 border-b border-[#ECECEC] pb-[14px] pt-[10px]">
        <input type="checkbox" id="listTwo" className="" />
        <div className="flex flex-col">
          <label htmlFor="listTwo" className="text-[#121212] font-bold text-[16px]">Deploy with Firebase</label>
          <label htmlFor="listTwo" className="text-[12px] text-[#41475E]">Tuesday, 29 June 2023</label>
        </div>
      </label>


    </div>
  );
};

export default ToDoListContainer;
