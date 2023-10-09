import { GetProductsResult } from '@/ecommerce/application'
import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { useEcommerceApplication } from '@/client/presentation/contexts/ecommerce-application-context'

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
