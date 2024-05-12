import { INotification } from "@/types/notification";
import { timeAgo } from "@/utils/dateUtils";
import { fetchWithToken } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface IProps {
  onClose?: () => void;
}

export default function List({ onClose }: IProps) {
  const { data: session, status } = useSession();
  const { data: notifications }: { data: Array<INotification> } = useSWR(
    () => (status === "authenticated" ? `/api/v1/notifications` : null),
    (url) => fetchWithToken(url, session?.user.tokens.accessToken ?? "")
  );

  return (
    <>
      {notifications &&
        notifications.map((notification) => (
          <Link
            onClick={onClose}
            href={notification.link ?? "/"}
            key={notification._id}
            className="flex gap-4"
          >
            <div
              className={`w-full h-full max-w-[64px] max-h-[64px] bg-gray bg-opacity-10 relative overflow-hidden  ${
                notification.user ? "rounded-full" : "rounded-md"
              }`}
            >
              <Image
                className="object-cover"
                src={
                  notification.srcUser?.profileImage ?? "/sample_user_icon.png"
                }
                alt="profile"
                fill
              />
            </div>

            <div className="w-fit flex flex-col">
              <span className="font-bold">{notification.title}</span>
              <span>{notification.message}</span>
              <span className="text-gray">
                {notification.createdAt &&
                  timeAgo(new Date(notification.createdAt))}
              </span>
            </div>
          </Link>
        ))}
    </>
  );
}
