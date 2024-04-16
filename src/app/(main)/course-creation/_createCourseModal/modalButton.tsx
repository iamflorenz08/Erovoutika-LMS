import React, { MouseEventHandler } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface IProps {
  label: string;
  onClick?: () => void;
}
export default function ModalButton({ onClick, label }: IProps) {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={onClick}
      disabled={pending}
      className={`text-gray bg-slate-100 font-medium text-xl py-2 px-4 w-[216px] hover:bg-primary hover:text-white rounded-md duration-300 ${
        pending && "!bg-primary text-white"
      }`}
    >
      {pending ? "Loading" : label}
    </button>
  );
}
