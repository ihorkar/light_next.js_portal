import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/utils/auth/NextAuthProvidert'
import CheckLoginIsRequired from '../utils/auth/CheckLoginIsRequired'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Light Portal',
  description: 'Light portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Light Portal</title>
        <meta name="description" content="Light portal"></meta>
      </head>
      <body>
        <NextAuthProvider>
          <CheckLoginIsRequired>
            {children}
          </CheckLoginIsRequired>
        </NextAuthProvider>
      </body>
    </html>
  )
}
