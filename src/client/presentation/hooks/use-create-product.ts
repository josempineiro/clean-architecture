import { useUseCaseMutation } from "@/core/presentation/hooks/use-use-case";
import { UseCaseOptions } from '@/core/presentation/hooks/use-use-case';
import { useEcommerceApplication } from "@/client/presentation/contexts/ecommerce-application-context"
import { CreateProductVariables, CreateProductResult } from '@/ecommerce/application';


export function useCreateProduct(options?: Omit<UseCaseOptions<CreateProductVariables, CreateProductResult>, 'key'>) {
  const ecommerceApplication = useEcommerceApplication()
  return useUseCaseMutation(ecommerceApplication.useCases.createProduct, {
    key: 'createProduct',
    ...options
  })
}