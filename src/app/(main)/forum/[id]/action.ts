'use server'
import z from 'zod'
import { ICommentStatus } from './commentSection'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export const addComment = async (prevState: any, formData: FormData) => {
    const session = await getServerSession(authOptions)
    const result: ICommentStatus = {
        success: false,
        artistID: null,
        comment: null
    }

    try {
        const commentSchema = z.object({
            parentID: z.string().min(1, { message: 'artistID is required.' }),
            comment: z.string().min(1, { message: 'comment is required.' })
        }).refine(data => data.comment !== '<p></p>', {
            message: 'comment is required.',
            path: ['comment']
        })

        const commentClean = commentSchema.parse({
            parentID: formData.get('parentID'),
            comment: formData.get('comment')
        })

        const res = await fetch(`${process.env.API_URI}/api/v1/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                parent: commentClean.parentID,
                comment: commentClean.comment
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        console.log(data)
        result.data = data
        result.success = true
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