'use client'
import Link from "next/link";
import { Products } from "@/ecommerce/domain"
import { Form, Field, TextField } from "@/core/presentation/components/forms";
import { useCreateProduct } from "@/client/presentation/hooks/use-create-product";

export default function ProductsPage() {
  const [createProduct] = useCreateProduct()
  return (
    <div>
      <Link href="/products">Back to products</Link>
      <Form<{
        name: string
        description: string
      
      }> values={{
        name: '',
        description: '',
      }}  onChange={console.log} onSubmit={ (values) => {
        createProduct(Products.create(values))
      }}>
      <Field<string> field="name" label="Name">
        <TextField />
      </Field>
        <Field<string> field="description" label="Description">
          <TextField />
        </Field>
        <button type="submit">
          Create product
        </button>
      </Form>
      
    </div>
  )
}