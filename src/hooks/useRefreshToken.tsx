import { useSession } from 'next-auth/react'
import axios from '@/utils/Axios'

export const useRefreshToken = () => {
    const { data: session } = useSession()
    const refreshToken = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/auth/refresh-token`, {
            refreshToken: session?.user.refreshToken
        })
        
        if (session) session.user.accessToken = res.data.accessToken
    }

    return refreshToken
}
