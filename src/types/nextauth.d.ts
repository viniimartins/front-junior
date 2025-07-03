import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      token: string
      platformRole: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    token: string
    platformRole: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      name: string
      email: string
      token: string
      platformRole: string
    }
  }
}
