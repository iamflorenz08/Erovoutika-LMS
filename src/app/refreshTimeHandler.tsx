
import { useSession } from "next-auth/react";
import { useEffect } from 'react'
interface IProps {
    getTimeRemaining: (remainingSeconds: number) => void
}

export default function RefreshTimeHandler({ getTimeRemaining }: IProps) {
    const { data: session } = useSession()
    useEffect(() => {
        if (session) {
            const timeRemaining = (session.user.tokens.accessTokenExpiry - 60 * 2) - (Date.now() / 1000)
            getTimeRemaining(timeRemaining > 0 ? timeRemaining : 0)
        }
    }, [session])

    return null
}
