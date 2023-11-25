import Image from "next/image"
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'

export default function WatchedThreads() {
    return (
        <div className="hidden bg-white w-full max-w-[336px] rounded-lg p-4 xl:flex flex-col gap-4 h-fit sticky top-0 shadow-md" >
            <button className="flex items-center gap-2 text-xl font-medium">
                <h1>Watched threads</h1>
                <span className="text-sm"><FaChevronRight /></span>
            </button>

            <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((value, index) => (
                    <div className="flex items-center gap-4">
                        <Image className="w-12 h-12 object-cover" src={'/sample_user_icon.png'} alt="icon" width={48} height={48} />
                        <div>
                            <h1 className="font-medium text-[10px] text-gray">XYeeva</h1>
                            <p className="font-semibold">Give your opinion about this</p>
                            <h2 className="font-medium text-xs text-gray">827 comments</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
