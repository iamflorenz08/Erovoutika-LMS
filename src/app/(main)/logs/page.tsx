import { Suspense } from "react";
import LogRows from "./logRows";
import Filters from "./filters";
import Pagination from "@/components/pagination";

export default function page() {
  return (
    <div className="px-6 py-4 flex gap-6">
      <section className="bg-white p-4 max-w-[256px] w-full">
        <Filters />
      </section>

      <div className="w-full flex flex-col items-center">
        <section className="w-full bg-white h-fit">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="text-left">
                <th className="p-2 px-4">Date</th>
                <th className="p-2 px-4">Time</th>
                <th className="p-2 px-4">User</th>
                <th className="p-2 px-4">Role</th>
                <th className="p-2 px-4">Activity</th>
              </tr>
            </thead>
            <tbody>
              <Suspense>
                <LogRows />
              </Suspense>
            </tbody>
          </table>
        </section>

        <Pagination pages={1} />
      </div>
    </div>
  );
}
