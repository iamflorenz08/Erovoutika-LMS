"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters() {
  const [filters, setFilters] = useState<{
    search?: string;
    dateRange?: [Date | null, Date | null];
  }>({
    search: "",
    dateRange: [null, null],
  });
  return (
    <>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-[14px] rounded-md bg-border"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <DatePicker
          selectsRange={true}
          className="bg-border rounded-md px-4 py-[14px]"
          onChange={(date) => setFilters({ ...filters, dateRange: date })}
          startDate={filters.dateRange?.[0]}
          endDate={filters.dateRange?.[1]}
        />
      </div>
    </>
  );
}
