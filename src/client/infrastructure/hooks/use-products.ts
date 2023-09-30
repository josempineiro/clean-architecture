import { Product } from '@/ecommerce/domain/entities/product';
import { useUseCaseQuery, UseCaseOptions, UseCaseResults } from '@/core/presentation/hooks/use-use-case';
import { useEcommerceApplication } from "@/client/infrastructure/context/ecommerce-application-context"

export function useProducts(options?: UseCaseOptions<void, Product[]>) {
  const { useCases: {
    getProducts
  } } = useEcommerceApplication()
  return useUseCaseQuery<void, Product[]>(getProducts, {
    key: 'getProducts',
    ...options
  })
}

export default useProducts