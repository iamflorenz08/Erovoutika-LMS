"use client";
import { CourseIdContext } from "@/contexts/CourseIdContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function CourseIdHandler() {
  const params = useParams<{ courseId: string }>();
  const [courseId, setCourseId] = useContext(CourseIdContext);
  useEffect(() => {
    setCourseId(params.courseId);
  }, [params.courseId]);
  return null;
}
