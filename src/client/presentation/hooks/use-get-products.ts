import { Product } from '@/ecommerce/domain';
import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation/hooks/use-use-case';
import { useEcommerceApplication } from "@/client/infrastructure/graphql/graphql-context/ecommerce-application-context"

export function useGetProducts(options?: UseCaseOptions<void, Product[]>): ReturnType<typeof useUseCaseQuery<void, Product[]>> {
  const { useCases: {
    getProducts
  } } = useEcommerceApplication()
  return useUseCaseQuery<void, Product[]>(getProducts, {
    key: 'getProducts',
    ...options
  })
}

export default useGetProducts