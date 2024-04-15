'use server'
import z from 'zod'
import { ICommentStatus } from './commentSection'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath, revalidateTag } from 'next/cache'

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

export const addVote = async (postId: string, voteType: string | undefined) => {
    const session = await getServerSession(authOptions)
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/posts/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            },
            body: JSON.stringify({
                userId: session?.user._id,
                postId,
                type: voteType
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/forum')
    } catch (e: any) {
        console.log(e)
    }
}

export const saveDeleteThread = async (save: boolean, postId: string) => {
    const session = await getServerSession(authOptions)
    try {
        if (save) {
            const res = await fetch(`${process.env.API_URI}/api/v1/save/thread`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + session?.user.tokens.accessToken
                },
                body: JSON.stringify({
                    userId: session?.user._id,
                    postId
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
        }
        else {
            const res = await fetch(`${process.env.API_URI}/api/v1/save/thread`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + session?.user.tokens.accessToken
                },
                body: JSON.stringify({
                    userId: session?.user._id,
                    postId
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
        }

        revalidatePath('/forum')
    } catch (e) {
        console.log(e)
    }
}

export const readReward = async () => {
    try {
        const session = await getServerSession(authOptions)
        const res = await fetch(`${process.env.API_URI}/api/v1/points/read-reward`, {
            method: 'PATCH',
            headers: {
                'authorization': 'Bearer ' + session?.user.tokens.accessToken
            }
        })
        if (!res.ok) throw new Error()

        revalidateTag('user')
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}