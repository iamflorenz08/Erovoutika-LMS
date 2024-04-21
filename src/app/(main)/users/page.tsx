import UserRows from "./userRows";
import FilterByRole from "./filterByRole";
import { Suspense } from "react";
import Pagination from "@/components/pagination";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUserCount } from "@/types/userTypes";

interface IProps {
  searchParams: { role: string; page: string };
}

const fetchUserCount = async (role: string) => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/users/count${
        role && role !== "all" ? "?role=" + role : ""
      }`,
      {
        headers: {
          authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) throw new Error("Server");
    return await res.json();
  } catch (error) {
    return null;
  }
};
export default async function page({ searchParams }: IProps) {
  const count: IUserCount = await fetchUserCount(searchParams.role);
  const pages = Math.ceil((count.userCount ?? 0) / 10);
  return (
    <section className="p-4 flex flex-col items-center">
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
                <UserRows role={searchParams.role} page={searchParams.page} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination pages={pages} />
    </section>
  );
}
