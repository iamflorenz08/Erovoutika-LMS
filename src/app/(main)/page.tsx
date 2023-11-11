'use client'
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useSession } from 'next-auth/react'
import Dashboard from "./dashboard/page"

export default function Home() {
  return <Dashboard />
}
