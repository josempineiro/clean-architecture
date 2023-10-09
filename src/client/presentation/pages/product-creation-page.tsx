'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Button } from '@/core/presentation';
import { useCreateProduct } from "@/client/presentation/hooks/use-create-product";
import { ProductCreationForm } from '@/client/presentation/components/products/product-creation-form';

export function ProductCreationPage() {
  const router = useRouter()
  const [createProduct, { loading, error }] = useCreateProduct({
    onSuccess: (product) => {
      router.push(`/products/${product.id}`)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <>
      <Link href="/products" className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
      ← Go back to products
      </Link>
        <ProductCreationForm
          values={{
            name: "",
            description: "",
          }}
          onSubmit={createProduct}
        >
          <Button type="submit" disabled={loading}>
            Create product
          </Button>
        </ProductCreationForm>
    </>
  )
}