'use client'
import EcommerceApplicationProvider from '@/client/infrastructure/context/ecommerce-application-context'
import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'

export default function ProductiveEcommerceApplication({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EcommerceApplicationProvider
      repositories={{
        productsRepository: new ProductsGraphqlRepository()
    }}>
      {children}
    </EcommerceApplicationProvider>
  )
}
