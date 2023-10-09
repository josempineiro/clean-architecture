import { useUseCaseMutation } from '@/core/presentation'
import { UseCaseOptions } from '@/core/presentation'
import {
  CreateProductVariables,
  CreateProductResult,
} from '@/ecommerce/application'
import { useEcommerceApplication } from '@/client/presentation/contexts/ecommerce-application-context'

export function useCreateProduct(
  options?: Omit<
    UseCaseOptions<CreateProductVariables, CreateProductResult>,
    'key'
  >,
) {
  const ecommerceApplication = useEcommerceApplication()
  return useUseCaseMutation(ecommerceApplication.useCases.createProduct, {
    key: 'createProduct',
    ...options,
  })
}
