import React, { useState } from "react";
import ModalButton from "./modalButton";
import { ICourse } from "@/types/course";
import { addCourse } from "./action";
import { IResponse } from "@/types/response";
import { useRouter } from "next/navigation";
interface IProps {
  doneStep: () => void;
}

export default function CourseNameModal({ doneStep }: IProps) {
  const router = useRouter();
  return (
    <form
      action={async (formData: FormData) => {
        const courseName = formData.get("courseName")?.toString();
        if (!courseName) return;
        const course: ICourse = JSON.parse(
          localStorage.getItem("course") || "{}"
        );
        course.name = courseName;
        const data: IResponse = await addCourse(course);
        if (!data.success) return;

        router.back();
        doneStep();
      }}
      className="bg-white border border-gray border-opacity-20 p-4 rounded-lg flex flex-col gap-4"
    >
      <h1 className="font-bold text-2xl">Course Name</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="courseName" className="text-xl">
          Course name
        </label>
        <input
          className="border border-gray border-opacity-20 rounded-md w-[752px] outline-none p-2"
          type="text"
          name="courseName"
          id="courseName"
        />
      </div>
      <div className="flex justify-end">
        <ModalButton label="Done" />
      </div>
    </form>
  );
}
