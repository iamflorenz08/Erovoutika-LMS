import { useEffect } from "react"
import { axiosAuth } from "@/utils/Axios"
import { useSession } from "next-auth/react"
import { useRefreshToken } from "./useRefreshToken"


export default function useAxiosAuth() {
    const { data: session } = useSession()
    const refreshToken = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`
            return config
        }, (err) => Promise.reject(err))

        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (err) => {
                const prevRequest = err.config
                if (err.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true
                    await refreshToken()
                    prevRequest.headers['Authorization'] = `Bearer ${session?.user.accessToken}`
                    return axiosAuth(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }
    }, [session])

    return axiosAuth
}
