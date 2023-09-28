'use client'
import { Application } from '@/core/domain/application'
import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

interface EcommerceClientApplication extends Application {
  useCases: {
    getProducts: GetProductsClientUseCase,
    createProduct: CreateProductClientUseCase,
  }
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export function useEcommerceApplication() {
  return useApplicationContext<EcommerceClientApplication>()
}

export default function EcommerceApplicationProvider({
  children,
  repositories,
}: {
  children: React.ReactNode,
  repositories: {
    productsRepository: ProductsRepository
  }
}) {
  return (
    <QueryClientProvider client={client}>
      <ApplicationContextProvider<EcommerceClientApplication> application={{
        useCases: {
          getProducts: new GetProductsClientUseCase({
            productsRepository: repositories.productsRepository
          }),
          createProduct: new CreateProductClientUseCase({
            productsRepository: repositories.productsRepository
          })
        }
      }}>
        {children}
      </ApplicationContextProvider>
    </QueryClientProvider>
  )
}