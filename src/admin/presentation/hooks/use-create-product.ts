import { useUseCaseMutation } from '@/core/presentation'
import { UseCaseOptions } from '@/core/presentation'
import {
  CreateProductVariables,
  CreateProductResult
} from '@/ecommerce/application'
import { useAdminApplication } from '@/admin/presentation/contexts'

export function useCreateProduct(
  options?: Omit<
    UseCaseOptions<CreateProductVariables, CreateProductResult>,
    'key'
  >,
) {
  const adminApplication = useAdminApplication()
  return useUseCaseMutation(adminApplication.useCases.createProduct, {
    key: 'createProduct',
    ...options,
  })
}
