'use client'

import { Inter } from 'next/font/google'
import { Header } from '@/ecommerce/presentation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="h-screen w-full flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
