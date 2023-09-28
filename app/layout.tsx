import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import MainContainer from '@/components/main-container'

const font = Roboto({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gamor',
  description: 'Plataforma de streaming de videojuegos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={font.className}>
          <MainContainer child={children} />
        </body>
      </ClerkProvider>
    </html>
  )
}