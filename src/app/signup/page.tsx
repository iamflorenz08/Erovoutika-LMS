'use client'
import FloatingLabelInput from "@/components/FloatingLabelInput"
import { useState } from "react"
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"

export default function SignUpPage() {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const titles: string[] = [
        "Enter your name",
        "Basic information",
        "Secure your account",
        "Pairing Code",
    ]
    return (
        <div className="bg-dirty-white w-screen h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg px-[32px] py-[24px] rounded-2xl w-[512px] h-[488px] flex flex-col justify-between">
                <div>
                    <h1 className="font-bold text-[32px] ">{titles[0]}</h1>

                    <div className="flex mt-[5px] gap-14">
                        <div
                            className="relative rounded-full bg-primary-light w-[12px] h-[12px]"></div>

                        <div
                            className={`relative rounded-full w-[12px] h-[12px] before:w-[40px] before:h-0.5 before:bg-opacity-30 before:absolute before:-left-12 before:top-[5px]  ${currentStep >= 1 ? 'bg-primary-light before:bg-primary-light' : 'border-gray border before:bg-gray'}`}></div>

                        <div
                            className={`relative rounded-full w-[12px] h-[12px] before:w-[40px] before:h-0.5 before:bg-opacity-30 before:absolute before:-left-12 before:top-[5px]  ${currentStep >= 2 ? 'bg-primary-light before:bg-primary-light' : 'border-gray border before:bg-gray'}`}></div>

                        <div
                            className={`relative rounded-full w-[12px] h-[12px] before:w-[40px] before:h-0.5 before:bg-opacity-30 before:absolute before:-left-12 before:top-[5px]  ${currentStep >= 3 ? 'bg-primary-light before:bg-primary-light' : 'border-gray border before:bg-gray'}`}></div>


                    </div>



                    {currentStep == 0 && (
                        <div>
                            <FloatingLabelInput id="firstName" label="First Name" type="text" className="mt-[24px]" />
                            <FloatingLabelInput id="lastName" label="Last Name" type="text" className="mt-[32px]" />
                        </div>
                    )}

                    {currentStep == 1 && (
                        <div className="flex gap-3">
                            <FloatingLabelInput id="month" label="Month" type="number" className="mt-[24px]" />
                            <FloatingLabelInput id="day" label="Day" type="text" className="mt-[24px]" />
                            <FloatingLabelInput id="year" label="Year" type="text" className="mt-[24px]" />
                        </div>
                    )}

                </div>


                <div className="flex gap-3">
                    <button
                        className="p-[16px] bg-[#F3F4F6] rounded-lg text-2xl"
                        onClick={() => currentStep > 0 && setCurrentStep(currValue => currValue - 1)}><IoMdArrowBack /></button>

                    <button
                        className="p-[16px] bg-primary w-full font-bold text-white rounded-lg"
                        onClick={() => currentStep < 3 && setCurrentStep(currValue => currValue + 1)}>Continue</button>
                </div>

            </div>

        </div >
    )
}
