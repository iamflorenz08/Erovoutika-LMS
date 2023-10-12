interface UserInput {
    id: string,
    label: string,
    type: string,
    className?: string
}

export default function FloatingLabelInput({ id, label, type, className }: UserInput) {
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                id={id}
                className="peer sam px-4 h-[64px] w-full text-xl border border-gray rounded-lg outline-none focus:border-blue-500 transition duration-200"
                placeholder=" "/>
            <label
                htmlFor={id}
                className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] bg-white text-gray
              peer-[.sam]:peer-placeholder-shown:translate-y-[18.5px] peer-[.sam]:peer-placeholder-shown:text-xl peer-[.sam]:peer-placeholder-shown:px-0
              peer-[.sam]:peer-placeholder-shown:mx-2 peer-[.sam]:peer-focus:text-blue-500 cursor-text">{label}</label>
        </div>
    )
}
