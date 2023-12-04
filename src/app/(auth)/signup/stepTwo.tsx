import FloatingLabelDropDown from "@/components/FloatingLabelDropDown"
import FloatingLabelInput from "@/components/FloatingLabelInput"
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"
import { months, genders } from "@/utils/Lists"
import { Dispatch, SetStateAction, useState } from "react"
import { IUserDetails } from "./page"

const currentDate = new Date();

interface IStep {
    userDetails: IUserDetails,
    setUserDetails: Dispatch<SetStateAction<IUserDetails>>,
    setCurrentStep: Dispatch<SetStateAction<number>>,
}

interface IErrorCheck {
    [index: string]: string,
    month: string,
    day: string,
    year: string,
    gender: string
}

export default function StepTwo({ userDetails, setUserDetails, setCurrentStep }: IStep) {
    const [error, setError] = useState<IErrorCheck>({
        month: '',
        day: '',
        year: '',
        gender: ''
    })
    const validate = () => {
        let isValid = true
        
        //Validate month
        if (userDetails.birthDate?.month) {
            setError(value => ({ ...value, month: '' }))
        }
        else {
            setError(value => ({ ...value, month: 'Select month' }))
            isValid = false
        }

        //Validate day
        if (userDetails.birthDate?.day && userDetails.birthDate.day >= 1 && userDetails.birthDate.day <= 31) {
            setError(value => ({ ...value, day: '' }));
        } else {
            setError(value => ({
                ...value,
                day: userDetails.birthDate?.day ? 'Enter valid day' : 'Input day',
            }));
            isValid = false;
        }

        //Validate year
        if (userDetails.birthDate?.year && userDetails.birthDate.year >= 1900 && userDetails.birthDate.year <= currentDate.getFullYear()) {
            setError(value => ({ ...value, year: '' }));
        } else {
            setError(value => ({
                ...value,
                year: userDetails.birthDate?.year ? 'Enter valid year' : 'Input year',
            }));
            isValid = false;
        }

        //Validate gender
        if (userDetails.gender) {
            setError(value => ({ ...value, gender: '' }))
        }
        else {
            setError(value => ({ ...value, gender: 'Select gender' }))
            isValid = false
        }



        isValid && setCurrentStep(value => value + 1)
    }
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
                <div className="flex justify-evenly gap-2 mt-[24px] ">
                    <FloatingLabelDropDown
                        id="month"
                        label="Month"
                        type="text"
                        onError={error.month}
                        list={months}
                        index={userDetails.birthDate?.month ? userDetails.birthDate.month - 1 : NaN}
                        onIndexChange={(index: number) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, month: index + 1 } })}
                    />

                    <FloatingLabelInput
                        id="day"
                        label="Day"
                        type="text"
                        onError={error.day}
                        value={userDetails.birthDate?.day}
                        onChange={(text: string) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, day: Number(text) } })} />

                    <FloatingLabelInput
                        id="year"
                        label="Year"
                        type="text"
                        onError={error.year}
                        value={userDetails.birthDate?.year}
                        onChange={(text: string) => setUserDetails({ ...userDetails, birthDate: { ...userDetails?.birthDate, year: Number(text) } })} />
                </div>

                <div className="mt-[32px]">
                    <FloatingLabelDropDown
                        id="gender"
                        label="Gender"
                        type="text"
                        onError={error.gender}
                        list={genders}
                        index={userDetails.gender ? genders.indexOf(userDetails.gender) : NaN}
                        onIndexChange={(index: number) => setUserDetails({ ...userDetails, gender: genders[index] })}
                    />
                </div>

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
                    Continue
                </button>
            </div>
        </div>
    )
}
