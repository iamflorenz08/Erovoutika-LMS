import React from "react";
import ModalsContainer from "./modalsContainer";

interface IProps {
  searchParams: { create: number };
}

export default function page({ searchParams }: IProps) {
  const isShow = Number(searchParams.create);
  if (!isShow) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 bg-opacity-20 flex justify-center items-center h-full">
      <ModalsContainer />
    </div>
  );
}
