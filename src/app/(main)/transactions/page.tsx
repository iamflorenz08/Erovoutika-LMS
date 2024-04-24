import { getServerSession } from "next-auth";
import Filters from "./filters";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ITransaction } from "@/types/transaction";
import Image from "next/image";
import { formatDate } from "@/utils/dateUtils";
import { IoPrintOutline } from "@react-icons/all-files/io5/IoPrintOutline";
import Pagination from "@/components/pagination";

interface IProps {
  searchParams: { search: string };
}
const fetchTransaction = async (search: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Not authorized.");

    console.log(
      `${process.env.API_URI}/api/v1/payments${
        search ? "?search=" + search : ""
      }`
    );
    const res = await fetch(
      `${process.env.API_URI}/api/v1/payments${
        search ? "?search=" + search : ""
      }`,
      {
        headers: {
          authorization: "Bearer " + session.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) throw new Error("Server error");
    return res.json();
  } catch (error) {
    return [];
  }
};
export default async function page({ searchParams }: IProps) {
  const transactions: Array<ITransaction> = await fetchTransaction(
    searchParams.search
  );
  return (
    <section className="p-4 flex flex-col items-center">
      <div className="bg-white w-[1056px] bg-border p-2">
        <h1 className="px-4 py-2 font-medium text-xl">Transactions</h1>
        <div className="flex justify-between items-center">
          <Filters />

          <div>
            <button className="bg-primary text-white py-2 px-4 flex justify-center items-center gap-2 rounded-md text-xl font-medium">
              <IoPrintOutline size={24} />
              Print Report
            </button>
          </div>
        </div>

        <div className="mt-2">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="text-left">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Transaction ID</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="py-2 w-fit">
                    <div className="w-6 h-6 bg-gray rounded-full relative overflow-hidden">
                      {transaction.user?.profileImage && (
                        <Image
                          className="object-cover"
                          src={transaction.user.profileImage}
                          alt="profile"
                          fill
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="capitalize">
                      {transaction.user?.fullName?.first}{" "}
                      {transaction.user?.fullName?.last}
                    </span>
                  </td>
                  <td className="py-2">
                    <span>
                      {transaction.createdAt &&
                        formatDate(new Date(transaction.createdAt))}
                    </span>
                  </td>
                  <td className="py-2">₱{transaction.totalAmount}</td>
                  <td className="py-2">
                    <span>{transaction._id}</span>
                  </td>
                  <td className="py-2 flex">
                    <button className="text-primary-light">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination pages={1} />
    </section>
  );
}
