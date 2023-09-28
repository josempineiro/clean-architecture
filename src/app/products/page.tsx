'use client'
import { Products } from "@/client/presentation/components/products"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
      <Link href="/products/create">
        Create product
      </Link>
      <Products  />
    </div>
  )
}