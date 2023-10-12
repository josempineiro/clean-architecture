'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/core/presentation'
import { useCreateProduct, ProductCreationForm } from '@/admin/presentation'

export function AdminProductCreationView() {
  const router = useRouter()
  const [createProduct, { loading }] = useCreateProduct({
    onSuccess: (product) => {
      router.push(`/admin/products/${product.id}`)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <>
      <ProductCreationForm
        values={{
          name: '',
          description: '',
        }}
        onSubmit={createProduct}
        disabled={loading}
      >
        <Button type="submit" disabled={loading} loading={loading}>
          Create product
        </Button>
      </ProductCreationForm>
    </>
  )
}
