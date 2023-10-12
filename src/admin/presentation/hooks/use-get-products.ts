import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetProductsResult } from '@/ecommerce/application'
import { useAdminApplication } from '@/admin/presentation/contexts'

export function useGetProducts(
  options?: UseCaseOptions<void, GetProductsResult>,
): ReturnType<typeof useUseCaseQuery<void, GetProductsResult>> {
  const adminApplication = useAdminApplication()
  return useUseCaseQuery<void, GetProductsResult>(adminApplication.useCases.getProducts, {
    key: 'getProducts',
    ...options,
  })
}
