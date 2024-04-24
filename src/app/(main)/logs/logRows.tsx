import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ILog } from "@/types/log";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { getServerSession } from "next-auth";
import React from "react";

export const fetchLogs = async (limit: number | null = null) => {
  try {
    const session = await getServerSession(authOptions);
    const res = await fetch(
      `${process.env.API_URI}/api/v1/logs${limit ? "?limit=" + limit : ""}`,
      {
        headers: {
          authorization: "Bearer " + session?.user.tokens.accessToken,
        },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
};

export default async function LogRows() {
  const logs: Array<ILog> = await fetchLogs(10);
  return logs.map((log) => (
    <tr key={log._id}>
      <td className="py-2 px-4">
        <span>{log.createdAt && formatDate(new Date(log.createdAt))}</span>
      </td>
      <td className="py-2 px-4">
        <span>{log.createdAt && formatTime(new Date(log.createdAt))}</span>
      </td>
      <td className="py-2 px-4">
        <span className="capitalize">
          {log.user?.fullName?.first} {log.user?.fullName?.last}
        </span>
      </td>
      <td className="py-2 px-4">
        <span className="capitalize">{log.user?.role}</span>
      </td>
      <td className="py-2 px-4">
        <span>{log.activity}</span>
      </td>
    </tr>
  ));
}
