"use client";
import { CourseIdContext } from "@/contexts/CourseIdContext";
import React, { useState } from "react";

interface IProps {
  children: React.ReactNode;
}
export default function Provider({ children }: IProps) {
  const [courseId, setCourseId] = useState<string | null>(null);
  return (
    <CourseIdContext.Provider value={[courseId, setCourseId]}>
      {children}
    </CourseIdContext.Provider>
  );
}
