interface IProps {
    setRewardValue: (rewardValue: number) => void
    value: number
}

interface IRewards {
    value: number,
    active: boolean
}

export default function Rewards({ setRewardValue, value }: IProps) {

    const rewards: IRewards[] = [
        {
            value: 0,
            active: value === 0
        },
        {
            value: 50,
            active: value === 50
        },
        {
            value: 100,
            active: value === 100
        }
    ]

    return (
        <div className="mt-5 flex flex-col gap-2.5">
            <h1 className="font-medium text-xl">Reward</h1>
            <div className="flex gap-2">
                {rewards.map((reward, index) => (
                    <button
                        key={index}
                        onClick={() => setRewardValue(reward.value)}
                        className={`w-12 h-10 text-center rounded-lg ${reward.active ? 'bg-primary-light text-white' : 'border'} border-gray border-opacity-20 text-gray duration-300`}>
                        {reward.value}
                    </button>
                ))}
            </div>
        </div>
    )
}
