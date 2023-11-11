import NextAuth from 'next-auth'

interface IFullName {
    first: string,
    last: string
}

interface IBirthDate {
    month?: number,
    day?: number,
    year?: number,
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            email: string,
            fullName: IFullName,
            birthDate: IBirthDate,
            gender: string,
            accessToken: string,
            refreshToken: string
        }
    }
}