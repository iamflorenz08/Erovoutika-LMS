import CourseOutline from "./courseOutline";

interface IProps {
  children: React.ReactNode;
  params: { courseId: string };
}

export default function layout({ children, params }: IProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-6">
        <section className="bg-white w-full rounded-lg p-4 border border-gray border-opacity-20 h-fit sticky top-4">
          <CourseOutline courseId={params.courseId} />
        </section>
        <section className="bg-white w-full rounded-lg p-4 h-fit border border-gray border-opacity-20">
          {children}
        </section>
      </div>
    </div>
  );
}
