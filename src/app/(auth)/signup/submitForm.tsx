import { useState, useEffect } from 'react'
import { IUserDetails } from './page'
import { IErrorResponse } from '@/utils/Responses'

export default function submitForm() {
    const [data, setData] = useState<object>()
    const [error, setError] = useState<IErrorResponse>({
        statusCode: 0,
        message: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        if (error.statusCode >= 400)
            throw new Error('Error')
    }, [error])

    const submit = async (userDetails: IUserDetails): Promise<boolean> => {
        setIsLoading(true)
        try {
            const { confirmPassword, ...userDetailsClean } = userDetails
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetailsClean)
            })

            const data = await res.json()

            if (res.status === 400) {
                setError(data)
                throw new Error(data.message)
            }

            setData(data)
            return true
        } catch (err) {
            // console.log(error.message)
        }
        setIsLoading(false)
        return false
    }

    return { isLoading, data, error, submit }
}
