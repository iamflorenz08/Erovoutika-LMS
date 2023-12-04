import NextAuth from 'next-auth'

interface IToken {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiry: number,
    refreshTokenExpiry: number
}

interface IFullName {
    first: string,
    last: string
}

interface IBirthDate {
    month?: number,
    day?: number,
    year?: number,
}

interface IUser {
    _id: string,
    email: string,
    fullName: IFullName,
    tokens: IToken
}


declare module "next-auth" {
    interface Session {
        user: IUser
        error?: "RefreshAccessTokenError"
    }

    interface User extends IUser { }

}

declare module "next-auth/jwt" {
    interface JWT {
        user: IUser
        error?: "RefreshAccessTokenError"
    }
}
