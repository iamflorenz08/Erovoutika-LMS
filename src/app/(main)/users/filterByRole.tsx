"use client";

import CustomSelect, { ISelectOption } from "@/components/customSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const options: Array<ISelectOption> = [
  {
    text: "All",
    value: "all",
  },
  {
    text: "Learner",
    value: "learner",
  },
  {
    text: "Instructor",
    value: "instructor",
  },
  {
    text: "Admin",
    value: "admin",
  },
];
export default function FilterByRole() {
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
    <CustomSelect
      className="!w-[180px] mt-2"
      onChange={(value) =>
        router.push(pathname + "?" + createQueryString("role", value ?? "all"))
      }
      options={options}
    />
  );
}
