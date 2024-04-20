import { HiOutlineArrowRight } from '@react-icons/all-files/hi/HiOutlineArrowRight'
import { BsCollectionPlay } from '@react-icons/all-files/bs/BsCollectionPlay'
export default function MyCourses() {
    return (
        <div
            className="flex flex-col h-[345px] bg-white rounded-lg shadow-md px-[28px] py-[20px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-bold">My Courses</h1>
                <ul className="flex gap-5 text-[18px]">
                    <li className="">All</li>
                    <li className="">Ongoing</li>
                    <li className="">Compeleted</li>
                </ul>
            </div>
            <div className="h-full grid grid-rows-3 items-center my-[20px]">

                <div className='flex items-center h-fit  gap-5'>
                    <div className='bg-[#F6F8FD] w-[48px] h-[48px] rounded-full flex items-center justify-center text-[#FFB547] text-2xl'>
                        <BsCollectionPlay />
                    </div>
                    <div>
                        <h2 className='font-bold text-[16px]'>Python for Everybody</h2>
                        <h3 className='font-medium text-[12px] text-gray'>By Random Author</h3>
                    </div>
                </div>

                <div className='flex items-center h-fit  gap-5'>
                    <div className='bg-[#F6F8FD] w-[48px] h-[48px] rounded-full flex items-center justify-center text-[#FFB547] text-2xl'>
                        <BsCollectionPlay />
                    </div>
                    <div>
                        <h2 className='font-bold text-[16px]'>Python for Everybody</h2>
                        <h3 className='font-medium text-[12px] text-gray'>By Random Author</h3>
                    </div>
                </div>

                <div className='flex items-center h-fit  gap-5'>
                    <div className='bg-[#F6F8FD] w-[48px] h-[48px] rounded-full flex items-center justify-center text-[#FFB547] text-2xl'>
                        <BsCollectionPlay />
                    </div>
                    <div>
                        <h2 className='font-bold text-[16px]'>Python for Everybody</h2>
                        <h3 className='font-medium text-[12px] text-gray'>By Random Author</h3>
                    </div>
                </div>

            </div>
            <button className="flex justify-end items-center text-[16px] font-bold text-primary-light gap-2">
                View All
                <span className='text-lg'><HiOutlineArrowRight /></span>
            </button>
        </div>
    )
}
