import ApplicationContextProvider, { useApplicationContext } from '@/core/infrastructure/contexts/application-context'
import { CreateProductClientUseCase } from '@/client/application/use-cases/create-product';
import { GetProductsClientUseCase } from '@/client/application/use-cases/get-products'
import { ProductsRepository } from '@/ecommerce/domain/repositories/products-repository';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { EcommerceApplication } from '@/ecommerce/application';


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
      <ApplicationContextProvider<EcommerceApplication> application={{
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