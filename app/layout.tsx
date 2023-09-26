import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from '@/components/navbar'

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
      <body className={font.className}>
        <Navbar />
        <main>
          <div className='main-container'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
