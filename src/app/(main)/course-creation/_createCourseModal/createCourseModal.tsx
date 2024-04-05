"use client";
import React from "react";
import ModalsContainer from "./modalsContainer";
import { useSearchParams } from "next/navigation";

export default function CreateCourseModal() {
  const searchParams = useSearchParams();
  if (!searchParams.get("create")) return null;
  return (
    <div className="fixed inset-0 bg-black z-50 bg-opacity-20 flex justify-center items-center h-full">
      <ModalsContainer />
    </div>
  );
}
