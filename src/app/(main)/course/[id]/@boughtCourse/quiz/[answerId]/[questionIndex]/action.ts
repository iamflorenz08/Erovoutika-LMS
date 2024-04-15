'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { RedirectType, redirect } from "next/navigation"
export const submitAnswer = async (formData: FormData, answerQuestionId: string | undefined, questionIndex: string | undefined) => {
    if (!answerQuestionId || !questionIndex) return null
    try {
        const session = await getServerSession(authOptions);
        const res = await fetch(
            `${process.env.API_URI}/api/v1/course/assesment/questions/${answerQuestionId}/${questionIndex}`,
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + session?.user.tokens.accessToken,
                },
                body: JSON.stringify({
                    answer: formData.get('selectedAnswer')
                })
            }
        );
        if (!res.ok) throw new Error('Server error')
        revalidateTag('quiz')
        return res.json()
    } catch (error) {
        return null
    }
}

export const submitAssesment = async (answerQuizId: string | undefined) => {
    try {
        if (!answerQuizId) return false
        const session = await getServerSession(authOptions);
        const res = await fetch(
            `${process.env.API_URI}/api/v1/course/assesment/questions/${answerQuizId}/submit`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: "Bearer " + session?.user.tokens.accessToken,
                }
            }
        );
        if (!res.ok) throw new Error('Server error')
        return true
    } catch (error) {
        console.log(error)
        return false;
    }


}

