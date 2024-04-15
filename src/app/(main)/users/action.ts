'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IUser } from "@/types/userTypes"
import { getServerSession } from "next-auth"

export const updateRole = async (userId: string | undefined, role: string | undefined) => {
    try {
        if (!userId || !role) return
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                role
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
    } catch (error) {
        console.log(error)
    }
}