'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ICourse, ITopic } from "@/types/course"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"

export const updateCourseDetails = async (courseId: string | undefined, courseDetails: ICourse) => {
    if (courseDetails && Object.keys(courseDetails).length === 0) return
   
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify(courseDetails)
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        revalidateTag('course')
    } catch (error) {
        console.log(error)
    }
}

export const updateTopicDetails = async (topicId: string | undefined, courseTopicDetails: ITopic) => {
    if (courseTopicDetails && Object.keys(courseTopicDetails).length === 0) return

    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/topic/${topicId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify(courseTopicDetails)
        })


        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message)
        }

        revalidateTag('course')
    } catch (error) {
        console.log(error)
    }
}