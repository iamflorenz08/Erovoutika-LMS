'use client'
import { useState } from "react"
import StepOne from "./stepOne"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import Link from "next/link"

interface IMonths {
    index: number,
    name: string,
}

interface IBirthDate {
    month?: number,
    day?: number,
    year?: number,
}
export interface IUserDetails {
    email?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: IBirthDate,
    gender?: string,
    password?: string,
    confirmPassword?: string,
}

const titles: string[] = [
    "Enter your name",
    "Basic information",
    "Secure your account",
]


export default function SignUpPage({ searchParams: { email } }: { searchParams: { email: string } }) {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [userDetails, setUserDetails] = useState<IUserDetails>(
        {
            email,
            firstName: "",
            lastName: "",
            birthDate: { month: NaN, day: NaN, year: NaN },
            gender: "",
            password: "",
            confirmPassword: "",
        }
    )

    return (
        <div className="bg-dirty-white w-screen h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg px-[32px] py-[24px] rounded-2xl w-[512px] h-[488px] flex flex-col">

                <h1 className="font-bold text-[32px] ">{titles[currentStep]}</h1>

                <div className="flex mt-[5px] gap-14">
                    <div
                        className="relative rounded-full bg-primary-light w-[12px] h-[12px]"></div>

                    <div
                        className={`relative rounded-full w-[12px] h-[12px] before:w-[40px] before:h-0.5 before:bg-opacity-30 before:absolute before:-left-12 before:top-[5px]  ${currentStep >= 1 ? 'bg-primary-light before:bg-primary-light' : 'border-gray border before:bg-gray'}`}></div>

                    <div
                        className={`relative rounded-full w-[12px] h-[12px] before:w-[40px] before:h-0.5 before:bg-opacity-30 before:absolute before:-left-12 before:top-[5px]  ${currentStep >= 2 ? 'bg-primary-light before:bg-primary-light' : 'border-gray border before:bg-gray'}`}></div>

                </div>



                {currentStep == 0 && (
                    <StepOne
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                        setCurrentStep={setCurrentStep}
                    />
                )}

                {currentStep == 1 && (
                    <StepTwo
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                        setCurrentStep={setCurrentStep}
                    />
                )}

                {currentStep == 2 && (
                    <StepThree
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                        setCurrentStep={setCurrentStep}
                    />
                )}


            </div>
            <div className="mt-3 flex items-center gap-2">
                <span>Already have an account?</span>
                <Link href={'/signin'} className="text-primary bg-primary-light-100 px-2 py-0.5 rounded-md">Sign In</Link>
            </div>
        </div >
    )
}
