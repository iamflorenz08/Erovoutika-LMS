"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function SelectACourseLabel() {
  const segment = useSelectedLayoutSegment();
  if (segment) return null;
  return (
    <div className="flex h-full justify-center items-center">
      <span className="text-5xl font-medium text-gray">Select a course</span>
    </div>
  );
}
