'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IUser } from "@/types/userTypes"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const updateProfile = async (updatedUser: IUser) => {
    try {
        const session = await getServerSession(authOptions)
        if (!session) throw new Error('Not authorized')
        const res = await fetch(`${process.env.API_URI}/api/v1/users/${session?.user._id}`, {
            method: 'PATCH',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        if (!res.ok) throw new Error('Server error')
        revalidatePath('user')
        return res.json()
    } catch (error) {
        console.log(error)
        return null
    }
}