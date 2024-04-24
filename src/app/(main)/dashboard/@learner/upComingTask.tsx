import { HiOutlineArrowRight } from "@react-icons/all-files/hi/HiOutlineArrowRight";

const UpComingTaskContainer = () => {
  return (
    <div className="flex flex-col w-[432px] h-[345px] bg-white rounded-lg bg-border py-[22px] px-[28px]">
      <h1 className="font-bold text-xl">Upcoming Task</h1>
      <div className="flex justify-center items-center h-full text-gray">
        Empty
      </div>
      <button className="flex justify-end items-center text-[16px] font-bold text-primary-light gap-2">
        View All
        <span className="text-lg">
          <HiOutlineArrowRight />
        </span>
      </button>
    </div>
  );
};

export default UpComingTaskContainer;
