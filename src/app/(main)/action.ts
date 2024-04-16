'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { revalidatePath, revalidateTag } from "next/cache"

export const updateInterests = async (interests: Array<string>) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/users/interests`, {
            method: 'PATCH',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interests })
        })

        const data = await res.json()
        if (!res.ok) return {
            success: false
        }

        return {
            success: true
        }

    } catch (error) {
        return {
            success: false
        }
    }
}
