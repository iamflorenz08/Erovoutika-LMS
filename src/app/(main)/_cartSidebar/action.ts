'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { RedirectType, redirect } from "next/navigation"

export const checkout = async () => {
    let url;
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/payments/checkout/${session?.user._id}`)
        const data = await res.json()

        if (!res.ok) return null
        url = data.redirectURL
    } catch (error: any) {
        console.log(error)
        return null
    }
    redirect(url, RedirectType.push)
}   