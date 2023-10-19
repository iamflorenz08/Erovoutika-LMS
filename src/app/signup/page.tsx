'use client'
import FloatingLabelInput from "@/components/FloatingLabelInput"
import { useState } from "react"
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"
import FloatingLabelDropDown from "@/components/FloatingLabelDropDown"
import { genders, months } from "@/utils/Lists"

interface IMonths {
    index: number,
    name: string,
}

interface IBirthDate {
    month?: number,
    day?: number,
    year?: number,
}
interface IUserDetails {
    firstName?: string,
    lastName?: string,
    birthDate?: IBirthDate,
    gender?: string,
    password?: string,
    confirmPassword?: string,
}

export default function SignUpPage() {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [userDetails, setUserDetails] = useState<IUserDetails>(
        {
            firstName: "",
            lastName: "",
            birthDate: { month: NaN, day: NaN, year: NaN },
            gender: "",
            password: "",
            confirmPassword: "",
        }
    )

    const titles: string[] = [
        "Enter your name",
        "Basic information",
        "Secure your account",
    ]

    return (
        <div className="bg-dirty-white w-screen h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg px-[32px] py-[24px] rounded-2xl w-[512px] h-[488px] flex flex-col justify-between">
                <div>
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
                        <div>
                            <FloatingLabelInput
                                id="firstName"
                                label="First Name"
                                type="text"
                                className="mt-[24px]"
                                value={userDetails.firstName}
                                onChange={(text: string) => setUserDetails({ ...userDetails, firstName: text })}
                            />

                            <FloatingLabelInput
                                id="lastName"
                                label="Last Name"
                                type="text"
                                className="mt-[32px]"
                                value={userDetails.lastName}
                                onChange={(text: string) => setUserDetails({ ...userDetails, lastName: text })}
                            />
                        </div>
                    )}

                    {currentStep == 1 && (
                        <div className="flex flex-col">
                            <div className="flex justify-evenly gap-2 mt-[24px] ">

                                <FloatingLabelDropDown
                                    id="month"
                                    label="Month"
                                    type="text"
                                    className="w-full"
                                    list={months}
                                    index={userDetails.birthDate?.month ? userDetails.birthDate.month - 1 : NaN}
                                    onIndexChange={(index: number) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, month: index + 1 } })}
                                />

                                <FloatingLabelInput
                                    id="day"
                                    label="Day"
                                    type="text"
                                    className="w-full"
                                    value={userDetails.birthDate?.day}
                                    onChange={(text: string) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, day: Number(text) } })} />

                                <FloatingLabelInput
                                    id="year"
                                    label="Year"
                                    type="text"
                                    className="w-full"
                                    value={userDetails.birthDate?.year}
                                    onChange={(text: string) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, year: Number(text) } })} />


                            </div>

                            <div className="mt-[32px]">
                                <FloatingLabelDropDown
                                    id="gender"
                                    label="Gender"
                                    type="text"
                                    list={genders}
                                    index={userDetails.gender ? genders.indexOf(userDetails.gender) : NaN}
                                    onIndexChange={(index: number) => setUserDetails({ ...userDetails, gender: genders[index] })}
                                />
                            </div>

                        </div>

                    )}

                    {currentStep == 2 && (
                        <>
                            <FloatingLabelInput
                                id="password"
                                label="Password"
                                type="password"
                                className="mt-[24px]"
                                value={userDetails.password}
                                onChange={(text: string) => setUserDetails({ ...userDetails, password: text })} />

                            <FloatingLabelInput
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                className="mt-[24px]"
                                value={userDetails.confirmPassword}
                                onChange={(text: string) => setUserDetails({ ...userDetails, confirmPassword: text })} />
                        </>
                    )}

                </div>


                <div className="flex gap-3 ">
                    <button
                        className="p-[16px] bg-[#F3F4F6] rounded-lg text-2xl"
                        onClick={() => currentStep > 0 && setCurrentStep(currValue => currValue - 1)}><IoMdArrowBack /></button>

                    <button
                        className="p-[16px] bg-primary w-full font-bold text-white rounded-lg"
                        onClick={() => currentStep < titles.length - 1 && setCurrentStep(currValue => currValue + 1)}>Continue</button>
                </div>

            </div>

        </div >
    )
}
