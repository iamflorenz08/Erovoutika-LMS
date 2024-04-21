"use client";
import { IoArrowBack } from "@react-icons/all-files/io5/IoArrowBack";
import { IoArrowForward } from "@react-icons/all-files/io5/IoArrowForward";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface IProps {
  pages?: number;
}

export default function Pagination({ pages }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-4 mt-8">
      <button className="w-12 h-12 bg-border rounded-md bg-white flex justify-center items-center text-gray">
        <IoArrowBack size={24} />
      </button>

      {Array(pages)
        .fill(0)
        .map((page, index) => (
          <button
            onClick={() =>
              router.push(
                pathname + "?" + createQueryString("page", String(index + 1))
              )
            }
            key={index}
            className="w-12 h-12 bg-border rounded-md bg-white flex justify-center items-center text-gray text-xl"
          >
            {index + 1}
          </button>
        ))}

      <button className="w-12 h-12 bg-border rounded-md bg-primary flex justify-center items-center text-white">
        <IoArrowForward size={24} />
      </button>
    </div>
  );
}
