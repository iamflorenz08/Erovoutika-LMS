import React from "react";

interface IProps {
  courseEdit: React.ReactNode;
  courseStatus: React.ReactNode;
  courses: React.ReactNode;
  createCourseModal: React.ReactNode;
}

export default function layout({
  courseStatus,
  courseEdit,
  courses,
  createCourseModal,
}: IProps) {
  return (
    <>
      {createCourseModal}
      <div className="px-6 py-4 flex h-full gap-6">
        <div className="w-full max-w-[368px]">{courses}</div>
        <div className="w-full">{courseEdit}</div>
        <div className="w-full max-w-[352px]">{courseStatus}</div>
      </div>
    </>
  );
}
