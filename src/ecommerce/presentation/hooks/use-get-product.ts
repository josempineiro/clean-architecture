import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductVariables, GetProductResult } from '@/ecommerce/application'
import { useEcommerceApplication } from '@/ecommerce/presentation/contexts/ecommerce-application-context'

export function useGetProduct(
  options?: Omit<UseCaseOptions<GetProductVariables, GetProductResult>, 'key'>,
): ReturnType<typeof useUseCaseQuery<GetProductVariables, GetProductResult>> {
  const {
    useCases: { getProduct },
  } = useEcommerceApplication()
  return useUseCaseQuery(getProduct, {
    key: 'getProduct',
    ...options,
  })
}

export default useGetProduct
