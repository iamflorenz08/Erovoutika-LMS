'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IContent } from "@/types/course"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const addTopic = async (courseId: string, title: string) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/topic`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, course: courseId })
        })
        revalidatePath('courseTopic')
        return res.json()
    } catch (e: any) {
        throw new Error(e.message)
    }
}

export const addContent = async (content: IContent) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/content`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        revalidatePath('courseTopic')
        return res.json()
    } catch (e: any) {
        throw new Error(e.message)
    }
}