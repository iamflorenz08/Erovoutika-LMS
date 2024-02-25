import CourseSlider from "./courseSlider";

interface IProps {
  id: "popular" | "recommended";
  title: string;
}

export default function CoursesSection({ title, id }: IProps) {
  return (
    <section>
      <div className="p-4 bg-white border border-gray border-opacity-20 rounded-lg">
        <h1 className="font-semibold text-xl">{title}</h1>
      </div>

      <div className="relative h-[360px] mt-4 mx-6 ">
        <CourseSlider id={id} />
      </div>
    </section>
  );
}
