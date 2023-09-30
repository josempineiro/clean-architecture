import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DevEcommerceApplicationProvider from '@/client/infrastructure/context/dev-ecommerce-application-context'
import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 w-full h-20 bg-teal-800 flex items-center">
          <div className="mx-auto max-w-7xl w-full">
            App header
          </div>
        </header>
        <DevEcommerceApplicationProvider>
          <div className="h-screen w-screen pt-20">
            {children}
          </div>
        </DevEcommerceApplicationProvider>
      </body>
    </html>
  )
}
