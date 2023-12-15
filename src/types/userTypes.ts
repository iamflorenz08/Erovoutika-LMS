export interface IFullname {
    first: string,
    last: string
}

export interface IBirthDate {
    month?: number,
    day?: number,
    year?: number,
}

export interface IBadge {
    _id: string,
    name: string,
    description: string,
    imageURL: string
}

export interface IUser {
    _id: string,
    fullName: IFullname
    birthDate: IBirthDate,
    gender: string,
    currentBadges: Array<IBadge>,
    availableBadges: Array<IBadge>
}