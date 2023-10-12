'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { EcommerceApplicationProvider } from '@/ecommerce/presentation'
import { ProductsGraphqlRepository } from '@/shop/infrastructure'
import { ShopEcommerceApplication } from '@/shop/application'

const productsGraphqlRepository = new ProductsGraphqlRepository('/graphql')

export const productiveShopEcommerceApplication = new ShopEcommerceApplication({
  productsRepository: productsGraphqlRepository,
})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <EcommerceApplicationProvider
          application={productiveShopEcommerceApplication}
        >
          <div className="h-screen w-screen">{children}</div>
        </EcommerceApplicationProvider>
      </body>
    </html>
  )
}
