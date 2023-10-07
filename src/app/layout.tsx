'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import EcommerceApplicationProvider from '@/client/presentation/contexts/ecommerce-application-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
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
