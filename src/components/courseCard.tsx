import { FormatCourseFormat, ICourse } from "@/types/course";
import { formatPrice } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface IProps {
  course?: ICourse;
}

export default function CourseCard({ course }: IProps) {
  const path = usePathname();
  return (
    <Link 
      href={path + "/" + course?._id}
      className="p-4 bg-white border border-gray border-opacity-20 h-full rounded-lg flex flex-col gap-4 hover:drop-shadow-md hover:shadow-md duration-200"
    >
      <div className="relative h-[120px] rounded-lg overflow-hidden">
        {course?.banner && (
          <Image
            alt="course image"
            className="object-cover"
            src={course?.banner}
            fill
          />
        )}

        <span className="px-4 py-2 text-primary absolute top-2 right-2 bg-white font-semibold rounded-full shadow-sm drop-shadow-sm">
          ₱ {formatPrice(course?.pricing?.price || 0)}
        </span>
      </div>

      <div>
        <h1 className="font-medium text-xl line-clamp-2 h-[60px]">
          {course?.name}
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-sm text-[#A7A7A7]">
            {FormatCourseFormat[String(course?.format)]}
          </h1>
          <p className="line-clamp-4">{course?.description}</p>
        </div>
      </div>
    </Link>
  );
}
