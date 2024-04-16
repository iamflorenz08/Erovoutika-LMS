'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IBadge } from "@/types/userTypes"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"

export const changeBadge = async (badge: IBadge | undefined, index: number) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/users/badges`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                badgeId: badge?._id,
                index
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/profile')
    } catch (e: any) {
        console.log(e.message)
    }

}

export const claimRewardDailyQuest = async () => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/points/quest/claim`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            }
        })

        if (!res.ok) throw new Error('Server error.')

        revalidateTag('daily_quest')
        return await res.json()
    } catch (error) {
        return null
    }
}