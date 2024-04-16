"use client";
import { questReward } from "@/app/action";
import { useEffect } from "react";

export default function DailyLoginReward() {
  useEffect(() => {
    const dailyLoginReward = async () => {
      await questReward("daily_quest_1");
    };

    dailyLoginReward();
  }, []);

  return null;
}
