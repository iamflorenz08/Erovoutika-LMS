import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const fetchCourseDetails = async (courseId: string) => {
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API_URI}/api/v1/course/${courseId}`, {
        next: { tags: ['course'] },
        headers: {
            'authorization': 'Bearer ' + session?.user.tokens.accessToken
        }
    })

    return res.json()
}

export const fetchCourseTopics = async (courseId: string) => {
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API_URI}/api/v1/course/topic/${courseId}`, {
        next: { tags: ['courseTopic'] },
        headers: {
            'authorization': 'Bearer ' + session?.user.tokens.accessToken
        }
    })

    return res.json()
}