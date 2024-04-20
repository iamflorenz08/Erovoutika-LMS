import { HiOutlineArrowRight } from '@react-icons/all-files/hi/HiOutlineArrowRight';


const UpComingTaskContainer = () => {
  return (
    <div
      className="flex flex-col w-[432px] h-[345px] bg-white rounded-lg shadow-md py-[22px] px-[28px]">
      <h1 className="font-bold text-xl">Upcoming Task</h1>
      <div className='h-full my-[30px] grid grid-rows-3'>

        <div className='flex items-center gap-3'>
          <div className='h-[41px] w-[5px] bg-primary-light rounded-full'></div>
          <div className='flex flex-col'>
            <h2 className='text-[16px] font-bold'>Online Class</h2>
            <h3 className='text-[12px] text-gray'>01:00 PM - 02:00 PM</h3>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='h-[41px] w-[5px] bg-primary-light rounded-full'></div>
          <div className='flex flex-col'>
            <h2 className='text-[16px] font-bold'>Online Class</h2>
            <h3 className='text-[12px] text-gray'>01:00 PM - 02:00 PM</h3>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='h-[41px] w-[5px] bg-primary-light rounded-full'></div>
          <div className='flex flex-col'>
            <h2 className='text-[16px] font-bold'>Online Class</h2>
            <h3 className='text-[12px] text-gray'>01:00 PM - 02:00 PM</h3>
          </div>
        </div>


      </div>
      <button className="flex justify-end items-center text-[16px] font-bold text-primary-light gap-2">
        View All
        <span className='text-lg'><HiOutlineArrowRight /></span>
      </button>
    </div>
  );
};

export default UpComingTaskContainer;
