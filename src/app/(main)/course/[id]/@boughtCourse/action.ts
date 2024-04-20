'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export const createAnswerQuiz = async (quizId: string) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/assesment/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                userId: session?.user._id,
                quizId
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        return data
    } catch (error) {
        return { answerQuizId: null }
    }
}

export const finishReadingContent = async (courseId: string | undefined, courseContentId: string | undefined) => {
    try {
        if (!courseId || !courseContentId) return
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/content/completed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                courseContent: courseContentId,
                course: courseId,
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidateTag('finish_content')
    } catch (error) {
        return
    }
}

export const fetchFinishedCourseContents = async (courseId: string) => {
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API_URI}/api/v1/course/content/completed/${courseId}`, {
        next: { tags: ['finish_content'] },
        headers: {
            'authorization': 'Bearer ' + session?.user.tokens.accessToken
        }
    })
    return res.json()
}