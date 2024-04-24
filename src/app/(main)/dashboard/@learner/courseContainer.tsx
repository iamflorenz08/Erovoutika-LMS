import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseContainerProps {
  imageUrl: string;
  text: string;
  url: string;
}

export default function CourseContainer({
  imageUrl,
  text,
  url,
}: CourseContainerProps) {
  return (
    <div className="group flex flex-col gap-4 p-4 bg-white rounded-lg border border-gray border-opacity-20 h-[224px] relative overflow-hidden">
      <div className="relative h-[112px] w-full bg-slate-100">
        <Image className="object-cover " src={imageUrl} alt="image" fill />
      </div>
      <h1 className="font-medium text-xl line-clamp-2">{text}</h1>

      <Link
        href={url}
        className="absolute inset-0 bg-primary bg-opacity-50 flex opacity-0 group-hover:opacity-100
        justify-center items-center h-full font-bold text-xl text-white duration-300"
      >
        View course
      </Link>
    </div>
  );
}
