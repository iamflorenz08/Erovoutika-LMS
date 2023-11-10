'use client'
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()
  const axiosAuth = useAxiosAuth()

  const submit = async () => {
    const res = await axiosAuth.get('http://localhost:5000/api/v1/auth/check')
    console.log(res)
  }
  return (
    <>
      <button onClick={submit}>hi</button>
    </>
  )
}
