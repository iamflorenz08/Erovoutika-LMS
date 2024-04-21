import { ICourse } from "@/types/course";
import CourseSlider from "../app/(main)/course/courseSlider";

interface IProps {
  id: string;
  title?: string;
  courses?: Array<ICourse>;
}

export default async function CoursesSection({ title, id, courses }: IProps) {
  return (
    <section>
      <div className="p-4 bg-white border border-gray border-opacity-20 rounded-lg">
        <h1 className="font-semibold text-xl">{title}</h1>
      </div>

      <div className="relative h-[360px] mt-4 mx-6 ">
        <CourseSlider id={id} courses={courses} />
      </div>
    </section>
  );
}
