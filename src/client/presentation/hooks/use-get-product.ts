import { GetProductVariables, GetProductResult } from '@/ecommerce/application';
import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation/hooks/use-use-case';
import { useEcommerceApplication } from "@/client/infrastructure/graphql/graphql-context/ecommerce-application-context"

export function useGetProduct(options?: Omit<UseCaseOptions<GetProductVariables, GetProductResult>, 'key'>): ReturnType<typeof useUseCaseQuery<GetProductVariables, GetProductResult>> {
  const { useCases: {
    getProduct
  } } = useEcommerceApplication()
  return useUseCaseQuery(getProduct, {
    key: 'getProduct',
    ...options
  })
}

export default useGetProduct