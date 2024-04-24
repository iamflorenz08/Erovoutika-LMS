"use client";

import useDropDown from "@/hooks/useDropDown";
import { GoBell } from "@react-icons/all-files/go/GoBell";
import { useEffect, useRef, useState } from "react";
import List from "./list";
import { useSession } from "next-auth/react";
import SocketIO from "@/utils/socketIo";
import { INotification } from "@/types/notification";

export default function Notification() {
  const notifRef = useRef(null);
  const [newNotif, setNewNotif] = useState<boolean>(false);
  const [toggle, setToggle] = useDropDown(false, notifRef);

  useEffect(() => {
    SocketIO.on("notification", (data: INotification) => {
      setNewNotif(true);
    });

    return () => {
      SocketIO.off("notification");
    };
  }, []);

  return (
    <div ref={notifRef} className="relative">
      <button
        onClick={() => {
          setToggle(!toggle);
          setNewNotif(false);
        }}
        className="p-3 text-[25px] text-black bg-white rounded-lg border border-slate-300 relative"
      >
        <GoBell size={18} />
        {newNotif && (
          <div className="h-2 w-2 bg-error absolute top-[10px] right-[12px] rounded-full border border-white"></div>
        )}
      </button>

      {toggle && (
        <div className="bg-white absolute top-14 right-0 w-[552px] h-[604px] bg-border rounded-md shadow-md z-50 p-4 flex flex-col">
          <h1 className="font-semibold text-xl">Notification</h1>
          <div className="flex flex-col w-full h-full overflow-auto mt-2 gap-2">
            <List onClose={() => setToggle(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
