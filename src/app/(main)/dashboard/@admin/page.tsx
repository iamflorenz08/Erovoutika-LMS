import { HiOutlineArrowRight } from "@react-icons/all-files/hi/HiOutlineArrowRight";
import RecentlyVisitedCard from "../recentlyVisitedCard";

export default function page() {
  return (
    <div className="flex gap-6 px-6 py-4">
      <div className="w-full flex flex-col gap-6">
        <section className="bg-border rounded-md bg-white p-4 min-h-[512px] max-h-[512px] flex flex-col">
          <h1 className="text-xl font-bold">Course Report</h1>
          <div className="flex flex-col mt-6 gap-2 h-full overflow-auto">
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
            <RecentlyVisitedCard />
          </div>
          <div className="flex justify-end">
            <button className="flex justify-end items-center text-[16px] font-bold text-primary gap-2">
              View All
              <span className="text-lg">
                <HiOutlineArrowRight />
              </span>
            </button>
          </div>
        </section>

        <section className="bg-border rounded-md bg-white p-4 min-h-[384px] max-h-[384px] flex flex-col">
          <h1 className="text-xl font-bold">Logs</h1>

          <div className="mt-6">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-left">
                  <th className="p-2 px-4">Date</th>
                  <th className="p-2 px-4">Time</th>
                  <th className="p-2 px-4">User</th>
                  <th className="p-2 px-4">Activity</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="min-w-[432px] flex flex-col gap-6">
        <section className="bg-white flex flex-col gap-2 p-4 items-center justify-center rounded-lg border border-gray border-opacity-20 h-[128px]">
          <span className="font-bold text-3xl">3</span>
          <span className="font-medium text-2xl">Daily Quests Available</span>
        </section>

        <section className="bg-border rounded-md bg-white p-4 min-h-[768px] max-h-[768px] flex flex-col">
          <h1 className="text-xl font-bold">Flagged Comments and Posts</h1>

          <div className="mt-6">
            <table className="w-full">
              <thead className="border-b-2">
                <tr className="text-left">
                  <th className="p-2 px-4">Report</th>
                  <th className="p-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
