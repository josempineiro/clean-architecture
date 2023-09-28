import Link from "next/link";
export default function AdminPage () {
  return (
    <div>
      <h1>Admin Page</h1>
      
      <Link href="/admin/products/create">
        Create a new product
      </Link>
    </div>
  )
}