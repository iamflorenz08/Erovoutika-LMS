import Navigation from "./navigation";
import CourseDetails from "./courseDetails";
import { Suspense } from "react";
import CourseIdHandler from "./courseIdHandler";

interface IProps {
  children: React.ReactNode;
  params: { courseId: string };
}

export default async function layout({ children, params }: IProps) {
  //   await new Promise((res) => setTimeout(res, 2000));
  return (
    <>
      <CourseIdHandler />
      <div className="flex flex-col gap-8 h-full">
        <Suspense fallback={"Loading"}>
          <div>
            <CourseDetails courseId={params.courseId} />
          </div>
        </Suspense>
        <div className="flex flex-col overflow-auto">
          <Navigation courseId={params.courseId} />
          <div className="py-4 flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
