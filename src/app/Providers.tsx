"use client";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import RefreshTimeHandler from "./refreshTimeHandler";
import { CourseSavingContext } from "@/contexts/CourseSavingContext";
import { CartSidebarContext } from "@/contexts/CartSidebarContext";

interface IProps {
  children: React.ReactNode;
}
export default function Providers({ children }: IProps) {
  const [refreshInterval, setRefreshInterval] = useState<number>(0);
  const [isCourseSaving, setIsCourseSaving] = useState<boolean>(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState<boolean>(false);
  return (
    <SessionProvider refetchInterval={refreshInterval}>
      <CartSidebarContext.Provider
        value={[isCartSidebarOpen, setIsCartSidebarOpen]}
      >
        <CourseSavingContext.Provider
          value={[isCourseSaving, setIsCourseSaving]}
        >
          {children}
        </CourseSavingContext.Provider>
      </CartSidebarContext.Provider>

      <RefreshTimeHandler
        getTimeRemaining={(time) => setRefreshInterval(time)}
      />
    </SessionProvider>
  );
}
