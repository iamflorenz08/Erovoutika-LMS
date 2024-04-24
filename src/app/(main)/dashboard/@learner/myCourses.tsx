import { HiOutlineArrowRight } from "@react-icons/all-files/hi/HiOutlineArrowRight";
import { BsCollectionPlay } from "@react-icons/all-files/bs/BsCollectionPlay";
import { FormatCourseFormat, ICourseProgress } from "@/types/course";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  coursesProgress?: Array<ICourseProgress>;
}
export default function MyCourses({ coursesProgress }: IProps) {
  return (
    <div className="flex flex-col h-[345px] bg-white rounded-lg bg-border px-[28px] py-[20px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-bold">My Courses</h1>
        <ul className="flex gap-5 text-[18px]">
          <li className="">All</li>
          <li className="">Ongoing</li>
          <li className="">Compeleted</li>
        </ul>
      </div>
      <div className="h-full grid grid-rows-3 items-center my-[20px]">
        {coursesProgress?.map((courseProgress) => (
          <div
            key={courseProgress._id}
            className="flex justify-between items-center h-fit  gap-5"
          >
            <div className="flex items-center gap-2">
              <div className="bg-[#F6F8FD] w-[96px] h-[48px] rounded-md flex items-center justify-center text-2xl relative overflow-hidden">
                {courseProgress.course?.banner && (
                  <Image
                    src={courseProgress.course?.banner}
                    alt="banner"
                    fill
                  />
                )}
              </div>
              <div>
                <h2 className="font-bold text-[16px] capitalize truncate">
                  {courseProgress.course?.name}
                </h2>
                <h3 className="font-medium text-[12px] text-gray capitalize truncate">
                  {FormatCourseFormat[String(courseProgress.course?.format)]}
                </h3>
              </div>
            </div>

            <div className="flex items-center lg:gap-5 2xl:gap-40">
              <div className="w-[241px] 2xl:w-[300px] flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Course Progress</span>
                  <span>{courseProgress.progressPercentage?.toFixed(0)}%</span>
                </div>
                <div className="relative bg-gray bg-opacity-50 h-2 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="bg-primary-light h-full absolute left-0"
                    style={{
                      width: `${courseProgress.progressPercentage?.toFixed(
                        0
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <Link
                href={"/course/" + courseProgress.course?._id}
                className="bg-primary rounded-md text-white px-5 py-2"
              >
                Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        href={"/course"}
        className="flex justify-end items-center text-[16px] font-bold text-primary-light gap-2"
      >
        View All
        <span className="text-lg">
          <HiOutlineArrowRight />
        </span>
      </Link>
    </div>
  );
}
