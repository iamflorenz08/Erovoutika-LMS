'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { revalidateTag } from "next/cache"

export const questReward = async (type: string) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/points/quest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                type
            })
        })


        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        revalidateTag('daily_quest')
    } catch (error) {

    }
}