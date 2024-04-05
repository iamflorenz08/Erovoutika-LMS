import { Suspense } from "react";
import Courses from "./_courses/courses";
import CourseStatus from "./_courseStatus/courseStatus";
import SelectACourseLabel from "./selectACourseLabel";
import CreateCourseModal from "./_createCourseModal/createCourseModal";

interface IProps {
  children: React.ReactNode;
  createCourseModal: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <CreateCourseModal />
      <div className="px-6 py-4 flex h-full gap-6">
        <div className="w-full max-w-[368px]">
          <div className="bg-white border border-gray border-opacity-20 rounded-lg h-full p-4 flex flex-col gap-4">
            <Suspense>
              <Courses />
            </Suspense>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white border border-gray border-opacity-20 rounded-lg h-full p-8 flex flex-col gap-4">
            <SelectACourseLabel />
            {children}
          </div>
        </div>
        <div className="w-full max-w-[352px]">
          <Suspense>
            <CourseStatus />
          </Suspense>
        </div>
      </div>
    </>
  );
}
