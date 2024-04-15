"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface IFilter {
  date?: string;
  user?: string;
  activity?: string;
}

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<IFilter>({
    date: searchParams.get("date") ?? "all",
    user: searchParams.get("user") ?? "",
    activity: searchParams.get("activity") ?? "",
  });

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    filter.date && params.set("date", filter.date);
    filter.user && params.set("user", filter.user);
    filter.activity && params.set("activity", filter.activity);
    router.push("/logs?" + params.toString());
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    setFilter({
      ...filter,
      date: "all",
      user: "",
      activity: "",
    });
    router.push("/logs");
  };

  const handleDateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, date: e.target.value });
  };

  const handlUserFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, user: e.target.value });
  };

  const handleActivityFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, activity: e.target.value });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-xl">Filter</h1>
        <button onClick={handleClear} className="text-primary-light">
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <label>
          <span className="font-medium">Filter by date:</span>
          <select
            value={filter.date}
            onChange={handleDateFilter}
            className="select select-bordered w-full max-w-xs !outline-none"
          >
            <option value={"all"}>All</option>
            <option value={"1h"}>1 hour ago</option>
            <option value={"12h"}>12 hours ago</option>
            <option value={"1d"}>1 day ago</option>
            <option value={"7d"}>7 days ago</option>
            <option value={"1m"}>1 month ago</option>
          </select>
        </label>

        <label>
          <span className="font-medium">Filter by User:</span>
          <input
            onChange={handlUserFilter}
            value={filter.user}
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs !outline-none"
          />
        </label>

        <label>
          <span className="font-medium">Filter by Activity:</span>
          <input
            onChange={handleActivityFilter}
            value={filter.activity}
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs !outline-none"
          />
        </label>

        <button
          onClick={handleApply}
          className="bg-primary text-white py-2 rounded-md text-xl font-medium"
        >
          Apply
        </button>
      </div>
    </>
  );
}
