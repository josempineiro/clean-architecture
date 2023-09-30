'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import EcommerceApplicationProvider from '@/client/infrastructure/context/ecommerce-application-context'
import devEcommerceApplication from '@/client/infrastructure/context/dev-ecommerce-application'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EcommerceApplicationProvider application={devEcommerceApplication}>
          <div className="h-screen w-screen">
            {children}
          </div>
        </EcommerceApplicationProvider>
      </body>
    </html>
  )
}
