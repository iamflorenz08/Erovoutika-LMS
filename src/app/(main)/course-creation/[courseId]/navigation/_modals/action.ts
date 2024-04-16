'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IQuiz } from "@/types/quiz"
import { getServerSession } from "next-auth"

export const saveQuiz = async (quiz: IQuiz) => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/course/assesment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify(quiz)
        })

    
        return res.json()
    } catch (error: any) {
        console.log(error.message)
    }

}