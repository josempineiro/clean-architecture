import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductsResult } from '@/ecommerce/application'
import { useShopApplication } from '@/shop/presentation/contexts/shop-application-context'

export function useGetProducts(
  options?: UseCaseOptions<void, GetProductsResult>,
): ReturnType<typeof useUseCaseQuery<void, GetProductsResult>> {
  const {
    useCases: { getProducts },
  } = useShopApplication()
  return useUseCaseQuery<void, GetProductsResult>(getProducts, {
    key: 'getProducts',
    ...options,
  })
}
