'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ICourse } from "@/types/course"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export const addCourse = async (course: ICourse) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify(course)
        })
        revalidateTag('course')
        return res.json()
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}