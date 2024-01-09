'use server'
import { revalidatePath } from "next/cache"
import { IPostStatus } from "./contentModal"
import z from 'zod'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const postContent = async (prevState: any, formData: FormData) => {
    const session = await getServerSession(authOptions)
    const result: IPostStatus = {
        success: false
    }
    try {
        const postSchema = z.object({
            title: z.string().trim().min(1, { message: 'Title is required.' }),
            contentMessage: z.string().min(1, { message: 'Content is required.' }),
            tags: z.string().array().min(1, { message: "Put atleast 1 tag." }),
            rewards: z.number()
        })

        const postClean = postSchema.parse({
            title: formData.get('title'),
            contentMessage: formData.get('contentMessage'),
            tags: formData.getAll('tags'),
            rewards: Number(formData.get('rewards'))
        })

        const res = await fetch(`${process.env.API_URI}/api/v1/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                title: postClean.title,
                contentMessage: postClean.contentMessage,
                tags: postClean.tags,
                rewards: postClean.rewards
            })
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.message)
        result.success = true
        revalidatePath('/forum')
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.map((value, index) => {
                const indexResult = value.path[0].toString()
                if (!result[indexResult]) {
                    result[indexResult] = value.message
                }
            })
        }

        if (e instanceof Error) {
            result.message = e.message
        }
        result.success = false
    }
    return result
}