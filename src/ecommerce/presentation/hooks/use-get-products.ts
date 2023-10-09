import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductsResult } from '@/ecommerce/application'
import { useEcommerceApplication } from '@/ecommerce/presentation/contexts'

export function useGetProducts(
  options?: UseCaseOptions<void, GetProductsResult>,
): ReturnType<typeof useUseCaseQuery<void, GetProductsResult>> {
  const {
    useCases: { getProducts },
  } = useEcommerceApplication()
  return useUseCaseQuery<void, GetProductsResult>(getProducts, {
    key: 'getProducts',
    ...options,
  })
}

export default useGetProducts
