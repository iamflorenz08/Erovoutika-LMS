'use server'
import { redirect } from "next/navigation"

interface ICheckEmail {
    isEmailExisted: boolean
}

export async function createUserEmail(prevState: any, formData: FormData) {
    const email = formData.get('email')?.toString()
    try {

        //Returns if email string is empty
        if (!email) return { message: "Input your email." }

        //Returns if the email is invalid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)) return { message: "Invalid email address." }


        //Returns if the email is already used
        const res = await fetch(`${process.env.API_URI}/api/v1/auth/check?email=${email}`, { cache: "no-cache" })
        const check: ICheckEmail = await res.json()
        if(check.isEmailExisted) return {message: "Email is in used."}
        
    } catch (e) {
        console.log(e)
        return { message: "Network error." }
    }

    return redirect(`/signup/?email=${email}`)
}