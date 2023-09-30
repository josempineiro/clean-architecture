'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import EcommerceApplicationProvider from '@/client/infrastructure/context/ecommerce-application-context'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EcommerceApplicationProvider>
          <div className="h-screen w-screen">
            {children}
          </div>
        </EcommerceApplicationProvider>
      </body>
    </html>
  )
}
