"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SocketIO from "@/utils/socketIo";

export default function Socket() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") return;
    SocketIO.connect();

    SocketIO.on("connect", () => {
      SocketIO.emit("userConnects", {
        userId: data?.user._id,
        socketId: SocketIO.id,
      });
    });

    return () => {
      SocketIO.off("connect");
      SocketIO.disconnect();
    };
  }, [status]);

  return null;
}
