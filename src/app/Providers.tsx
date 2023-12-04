'use client'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import RefreshTimeHandler from './refreshTimeHandler'

interface IProps {
    children: React.ReactNode
}
export default function Providers({ children }: IProps) {
    const [refreshInterval, setRefreshInterval] = useState<number>(0)
    return (
        <SessionProvider refetchInterval={(refreshInterval)}>
            {children}
            <RefreshTimeHandler
                getTimeRemaining={(time) => setRefreshInterval(time)}
            />
        </SessionProvider>
    )
}
