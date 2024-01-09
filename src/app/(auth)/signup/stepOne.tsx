import FloatingLabelInput from "@/components/FloatingLabelInput"
import { IUserDetails } from "./page"
import { Dispatch, SetStateAction, useState } from "react"

interface IStep {
    userDetails: IUserDetails,
    setUserDetails: Dispatch<SetStateAction<IUserDetails>>,
    setCurrentStep: Dispatch<SetStateAction<number>>,
}

interface IErrorCheck {
    [index: string]: string,
    firstName: string,
    lastName: string
}

export default function StepOne({ userDetails, setUserDetails, setCurrentStep }: IStep) {
    const [error, setError] = useState<IErrorCheck>({
        firstName: '',
        lastName: ''
    })

    const validate = () => {
        let isValid = true

        if (userDetails.firstName?.trim()) {
            setError(value => ({ ...value, firstName: '' }))
        }
        else {
            setError(value => ({ ...value, firstName: 'Enter first name.' }))
            isValid = false
        }

        if (userDetails.lastName?.trim()) {
            setError(value => ({ ...value, lastName: '' }))
        }
        else {
            setError(value => ({ ...value, lastName: 'Enter last name.' }))
            isValid = false
        }

        if (isValid) setCurrentStep(value => value + 1)
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <FloatingLabelInput
                    id="firstName"
                    label="First Name"
                    type="text"
                    className="mt-[24px]"
                    value={userDetails.firstName}
                    onError={error.firstName}
                    onChange={(text: string) => setUserDetails({ ...userDetails, firstName: text })}
                />

                <FloatingLabelInput
                    id="lastName"
                    label="Last Name"
                    type="text"
                    className="mt-[32px]"
                    value={userDetails.lastName}
                    onError={error.lastName}
                    onChange={(text: string) => setUserDetails({ ...userDetails, lastName: text })}
                />
            </div>


            <button
                className="p-[16px] bg-primary w-full font-bold text-white rounded-lg"
                onClick={validate}>
                Continue
            </button>
        </div>
    )
}
