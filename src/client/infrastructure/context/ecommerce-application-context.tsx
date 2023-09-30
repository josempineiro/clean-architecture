'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsDatastoreRepository } from '@/client/infrastructure/repositories/products-datastore-repository'
import { EcommerceApplication } from '@/ecommerce/application';
import { ProductsGraphqlRepository } from '@/client/infrastructure/repositories/products-graphql-repository'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export function useEcommerceApplication() {
  return useApplicationContext<EcommerceApplication>()
}

const productsDatastoreRepository = new ProductsDatastoreRepository()
const productsGraphqlRepository = new ProductsGraphqlRepository()

export const clientDevEcommerceApplication: EcommerceApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsDatastoreRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsDatastoreRepository
    })
  }
}

export const clientProductiveEcommerceApplication: EcommerceApplication = {
  useCases: {
    getProducts: new GetProductsClientUseCase({
      productsRepository: productsGraphqlRepository
    }),
    createProduct: new CreateProductClientUseCase({
      productsRepository: productsGraphqlRepository
    })
  }
}
const currentEcommerceApplicationProvider = process.env.NODE_ENV === 'production'
  ? clientDevEcommerceApplication
  : clientProductiveEcommerceApplication

export default function EcommerceApplicationProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={client}>
      <ApplicationContextProvider<EcommerceApplication> application={currentEcommerceApplicationProvider}>
        {children}
      </ApplicationContextProvider>
    </QueryClientProvider>
  )
}