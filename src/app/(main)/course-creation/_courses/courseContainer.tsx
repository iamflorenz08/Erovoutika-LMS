import { FormatCourseFormat } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  id?: string;
  banner?: string;
  name?: string;
  format?: string;
}

export default function CourseContainer({ banner, format, id, name }: IProps) {
  return (
    <Link
      href={"/course-creation/" + id + "/details"}
      className="flex gap-2 items-center hover:bg-slate-100 py-[6px] rounded-lg duration-300"
    >
      <div className="relative w-20 h-10 rounded-lg overflow-hidden">
        <Image
          alt="course"
          className="object-cover"
          src={
            banner ||
            "https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg"
          }
          fill
        />
      </div>
      <div>
        <h1 className="font-semibold line-clamp-1 capitalize">{name}</h1>
        <h3 className="font-medium text-sm text-gray line-clamp-1 capitalize">
          {FormatCourseFormat[String(format)]}
        </h3>
      </div>
    </Link>
  );
}
