'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const addToCart = async (courseId: string | undefined) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                user: session?.user._id,
                course: courseId
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        return data
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}

export const removeToCart = async (cartId: string | undefined) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/carts/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        return data
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}