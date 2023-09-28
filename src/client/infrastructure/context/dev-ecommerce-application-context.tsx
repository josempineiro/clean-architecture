'use client'
import EcommerceApplicationProvider from '@/client/infrastructure/context/ecommerce-application-context'
import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EcommerceApplicationProvider
      repositories={{
        productsRepository: new ProductsDatastoreRepository()
      }}
    >
      {children}
    </EcommerceApplicationProvider>
  )
}
