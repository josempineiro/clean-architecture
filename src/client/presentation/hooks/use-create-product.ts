import { Product } from "@/ecommerce/domain"
import { useUseCaseMutation } from "@/core/presentation/hooks/use-use-case";
import { useEcommerceApplication } from "@/client/infrastructure/graphql/graphql-context/ecommerce-application-context"

export function useCreateProduct(options: {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
} = {}) {
  const ecommerceApplication = useEcommerceApplication()
  return useUseCaseMutation(ecommerceApplication.useCases.createProduct, {
    key: 'createProduct',
    onSuccess: options.onSuccess,
    onError: options.onError,
  })
}