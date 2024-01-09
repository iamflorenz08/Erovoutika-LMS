import { IUser } from "@/types/next-auth"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken: token.user.tokens.refreshToken
            })
        })

        if (!res.ok) throw new Error()
        const data = await res.json()
        token.user.tokens.accessToken = data.accessToken
        token.user.tokens.accessTokenExpiry = data.accessTokenExpiry
        token.error = undefined
    } catch (e) {
        token.error = "RefreshAccessTokenError"
    }

    return token
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.API_URI}/api/v1/auth/signin`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ email: credentials?.email, password: credentials?.password })
                })
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)
                return data
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const res = await fetch(`${process.env.API_URI}/api/v1/auth/signin/google`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.email,
                        idToken: account.id_token || '',
                    })
                })

                const data = await res.json()
                if (!res.ok) {
                    if (data.message === 'User isn\'t registered.') {
                        return '/signup?email=' + user.email
                    }
                    throw new Error(data.message)
                }

                user = {
                    ...user,
                    ...data
                }

                return true
            }

            return true
        },
        async jwt({ token, user, account }) {
            //Initial sign in
            if (account) {
                token.user = user as IUser
            }

            //Check if the access token is valid
            const shoudRefresh = (token.user.tokens.accessTokenExpiry - 60 * 3) - (Date.now() / 1000)
            if (shoudRefresh > 0) {
                return token
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user = token.user
            session.error = token.error
            return session
        },
        async redirect({ baseUrl, url }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: '/signin',
        error: '/signin',
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }