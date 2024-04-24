'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export const assignedInstructor = async (instructorId: string | undefined, courseId: string | undefined) => {
    try {
        if (!instructorId || !courseId) throw new Error('Missing ids.')
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/${courseId}`, {
            method: 'PATCH',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                instructor: instructorId
            })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message)

        revalidateTag('course')
        return res.json()
    } catch (error) {
        console.log(error)
        return null
    }
}