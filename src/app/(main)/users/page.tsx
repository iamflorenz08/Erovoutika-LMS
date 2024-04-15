import UserRows from "./userRows";
import FilterByRole from "./filterByRole";
import { Suspense } from "react";

interface IProps {
  searchParams: { role: string };
}
export default function page({ searchParams }: IProps) {
  return (
    <section className="p-4 flex justify-center">
      <div className="bg-white w-[920px] bg-border p-2">
        <h1 className="px-4 py-2 font-medium text-xl">Users</h1>
        <FilterByRole />
        <div className="mt-2">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="text-left">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Date joined</th>
                <th className="p-2">Role</th>
                <th className="p-2">Level</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <Suspense key={searchParams.role}>
                <UserRows role={searchParams.role} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
