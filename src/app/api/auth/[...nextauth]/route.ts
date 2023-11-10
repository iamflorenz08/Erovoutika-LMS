import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"


const handler = NextAuth({
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

                if (!res.ok) {
                    throw new Error(data.error)
                }

                return data
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        }
    },
    pages: {
        signIn: '/signin'
    }
})

export { handler as GET, handler as POST }