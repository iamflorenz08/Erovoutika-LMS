import { Suspense } from "react";
import Courses from "./_courses/courses";
import CourseStatus from "./_courseStatus/courseStatus";
import SelectACourseLabel from "./selectACourseLabel";
import CreateCourseModal from "./_createCourseModal/createCourseModal";
import Provider from "./provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface IProps {
  children: React.ReactNode;
  createCourseModal: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Provider>
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
            <CourseStatus accessToken={session?.user.tokens.accessToken} />
          </div>
        </div>
      </Provider>
    </>
  );
}
