// CourseContainer.tsx
import Image from "next/image";
import Link from "next/link";

interface CourseContainerProps {
  courseBanner?: string;
  title?: string;
  format?: string;
  dateRange?: string;
  courseId?: string;
}

export default function CourseReportContainer({
  courseBanner,
  title,
  format,
  dateRange,
  courseId,
}: CourseContainerProps) {
  return (
    <Link
      href={"/course-report/" + courseId}
      className="group relative bg-white p-4 h-[280px] max-w-[272px] bg-border rounded-md flex flex-col"
    >
      <div className="min-h-[120px] relative ">
        {courseBanner && (
          <Image
            className="rounded-md"
            src={courseBanner}
            alt="Course Banner"
            objectFit="cover"
            fill
          />
        )}
      </div>

      <div className="flex flex-col justify-between h-full mt-4">
        <p className="font-medium text-xl line-clamp-2">{title}</p>
        <div>
          <p className="font-light text-[13px]">{format}</p>
          {dateRange && <p className="font-light text-[14px]">{dateRange}</p>}
        </div>
      </div>
    </Link>
  );
}
