import { Product } from "@/ecommerce/domain"
import { useUseCaseMutation } from "@/core/presentation/hooks/use-use-case";
import { useEcommerceApplication } from "@/client/infrastructure/context/ecommerce-application-context"

export function useCreateProduct(options: {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
} = {}) {
  const ecommerceApplication = useEcommerceApplication()
  const mutation = useUseCaseMutation<Product, Product>(ecommerceApplication.useCases.createProduct, {
    key: 'createProduct',
    onSuccess: options.onSuccess,
    onError: options.onError,
  })
  return mutation
}