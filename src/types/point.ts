import { IUser } from "./userTypes"

export type IPointType = 'daily_quest_1' | 'daily_quest_2' | 'daily_quest_claimed' | 'reading_reward'


export interface IQuest {
    quest?: string
    count?: number
    isCompleted?: boolean,
    maxCount?: number
}

export interface IPoint {
    isQuestsCompleted?: boolean,
    isDailyQuestRewardClaimed?: boolean,
    quests?: Array<IQuest>
}