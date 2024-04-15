'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

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
        console.log(error)
        return { answerQuizId: null }
    }
}