import React, { Suspense } from "react";

interface IProps {
  params: { id: Array<string> };
}

export default async function page({ params }: IProps) {
  await new Promise((res) => setTimeout(res, 2000));
  return (
    <div className="border border-gray border-opacity-20 bg-white h-full rounded-lg p-4">
      <div className="flex h-full justify-center items-center font-bold text-4xl text-gray">
        Select a course {params.id?.[0]}
      </div>
    </div>
  );
}
