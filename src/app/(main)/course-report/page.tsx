import Filters from "./filters";
import CourseReportContainer from "./course-report-container";
import { FormatCourseFormat, ICourse } from "@/types/course";
import { fetchCoursesReport } from "./fetch";

export default async function CourseReport() {
  const courses: Array<ICourse> = await fetchCoursesReport();
  return (
    <div className="pl-6 py-4 flex gap-6">
      <div className="flex w-full gap-6">
        <section className="bg-white p-4 w-[256px] h-fit rounded-md bg-border">
          <Filters />
        </section>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  gap-6 h-full ">
          {courses.map((course) => (
            <CourseReportContainer
              key={course._id}
              courseId={course._id}
              courseBanner={course.banner}
              title={"Introduction to Laravel"}
              format={FormatCourseFormat[String(course.format)]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
