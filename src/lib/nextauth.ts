import { jwtDecode } from 'jwt-decode'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { api } from '@/service/api'
import { DecodedToken } from '@/types/decoded-token'

interface SignIn {
  [x: string]: any
  token: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const { data } = await api.post<SignIn>(`/auth/login`, {
          email: credentials?.email,
          password: credentials?.password,
        })

        if (!data) {
          return null
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { exp, iat, ...user } = jwtDecode<DecodedToken>(data.token)

        return {
          id: user.userId,
          email: user.email,
          name: data.user.name!,
          token: data.token,
          platformRole: user.platformRole,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...session }
      }

      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }

      return session
    },
  },

  session: {
    strategy: 'jwt',
  },
  debug: true,
}
