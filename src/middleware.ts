import { withAuth } from 'next-auth/middleware'

import { env } from './env'

export default withAuth({
  pages: {
    signIn: '/login',
  },
  secret: env.NEXTAUTH_SECRET,
})

export const config = {
  matcher: [
    '/((?!login|create-account|_next|api|favicon.ico|images|fonts|.*\\.svg$).*)',
  ],
}
