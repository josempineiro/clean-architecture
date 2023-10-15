import { useUseCaseMutation } from '@/core/presentation'
import { UseCaseOptions } from '@/core/presentation'
import {
  UpdateProductVariables,
  UpdateProductResult
} from '@/ecommerce/application'
import { useAdminApplication } from '@/admin/presentation/contexts'

export function useUpdateProduct(
  options?: Omit<
    UseCaseOptions<UpdateProductVariables, UpdateProductResult>,
    'key'
  >,
) {
  const adminApplication = useAdminApplication()
  return useUseCaseMutation(adminApplication.useCases.updateProduct, {
    key: 'updateProduct',
    updateKey: (variables) => ['getProduct', { id: variables.id }],
    ...options,
  })
}
