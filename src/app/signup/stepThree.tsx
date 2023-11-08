import FloatingLabelInput from "@/components/FloatingLabelInput";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { IUserDetails } from "./page";
import { Dispatch, SetStateAction, useState } from "react";

interface IStep {
    userDetails: IUserDetails,
    setUserDetails: Dispatch<SetStateAction<IUserDetails>>,
    setCurrentStep: Dispatch<SetStateAction<number>>,
}

interface IErrorCheck {
    [index: string]: string,
    password: string,
    confirmPassword: string,
}

export default function StepThree({ userDetails, setUserDetails, setCurrentStep }: IStep) {
    const [error, setError] = useState<IErrorCheck>({
        password: '',
        confirmPassword: '',
    })

    const validate = () => {
        let isValid = true
        //Validate Password
        if (userDetails.password && userDetails.password.length > 5) {
            setError(value => ({ ...value, password: '' }))
        }
        else {
            setError(value => ({
                ...value, password: userDetails.password ? 'Password too short.' : 'Input password.'
            }))

            isValid = false
        }

        //Validate Confirm Password
        if (userDetails.confirmPassword && userDetails.confirmPassword === userDetails.password) {
            setError(value => ({ ...value, confirmPassword: '' }))
        }
        else {
            setError(value => ({
                ...value, confirmPassword: userDetails.confirmPassword ? 'Password mismatch.' : 'Input password.'
            }))

            isValid = false
        }

        isValid && setCurrentStep(value => value + 1)
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <FloatingLabelInput
                    id="password"
                    label="Password"
                    type="password"
                    className="mt-[24px]"
                    onError={error.password}
                    value={userDetails.password}
                    onChange={(text: string) => setUserDetails({ ...userDetails, password: text })} />

                <FloatingLabelInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    className="mt-[24px]"
                    onError={error.confirmPassword}
                    value={userDetails.confirmPassword}
                    onChange={(text: string) => setUserDetails({ ...userDetails, confirmPassword: text })} />
            </div>

            <div className="flex gap-3 ">
                <button
                    className="p-[16px] bg-[#F3F4F6] rounded-lg text-2xl"
                    onClick={() => setCurrentStep(currValue => currValue - 1)}>
                    <IoMdArrowBack />
                </button>


                <button
                    className="p-[16px] bg-primary w-full font-bold text-white rounded-lg"
                    onClick={validate}>
                    Done
                </button>
            </div>
        </div>
    )
}
