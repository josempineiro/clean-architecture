import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductVariables, GetProductResult } from '@/ecommerce/application'
import { useAdminApplication } from '@/admin/presentation/contexts'

export function useGetProduct(
  options?: Omit<UseCaseOptions<GetProductVariables, GetProductResult>, 'key'>,
): ReturnType<typeof useUseCaseQuery<GetProductVariables, GetProductResult>> {
  const adminApplication = useAdminApplication()
  return useUseCaseQuery(adminApplication.useCases.getProduct, {
    key: 'getProduct',
    ...options,
  })
}
