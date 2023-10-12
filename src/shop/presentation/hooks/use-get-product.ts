import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductVariables, GetProductResult } from '@/ecommerce/application'
import { useShopApplication } from '@/shop/presentation/contexts/shop-application-context'

export function useGetProduct(
  options?: Omit<UseCaseOptions<GetProductVariables, GetProductResult>, 'key'>,
): ReturnType<typeof useUseCaseQuery<GetProductVariables, GetProductResult>> {
  const {
    useCases: { getProduct },
  } = useShopApplication()
  return useUseCaseQuery(getProduct, {
    key: 'getProduct',
    ...options,
  })
}
