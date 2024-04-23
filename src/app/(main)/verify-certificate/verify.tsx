"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
  const router = useRouter();
  const pathName = usePathname();
  const [certificateId, setCertificateId] = useState<string>("");
  return (
    <>
      <input
        type="text"
        className="w-full bg-border rounded-md text-xl px-4 py-2"
        placeholder="Enter certificate ID here..."
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
      />
      <button
        onClick={() => router.push(pathName + "?id=" + certificateId)}
        className="bg-primary text-white px-4 py-2 w-fit text-nowrap rounded-md"
      >
        Verify Certificate
      </button>
    </>
  );
}
