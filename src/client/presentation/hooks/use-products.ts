import { Product } from '@/ecommerce/domain';
import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation/hooks/use-use-case';
import { useEcommerceApplication } from "@/client/infrastructure/graphql/graphql-context/ecommerce-application-context"

export function useProducts(options?: UseCaseOptions<void, Product[]>): ReturnType<typeof useUseCaseQuery<void, Product[]>> {
  const { useCases: {
    getProducts
  } } = useEcommerceApplication()
  return useUseCaseQuery<void, Product[]>(getProducts, {
    key: 'getProducts',
    ...options
  })
}

export default useProducts