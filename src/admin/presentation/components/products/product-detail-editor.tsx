import { useState } from 'react'
import cn from 'classnames'
import { Form } from '@/core/domain'
import { Product } from '@/ecommerce/domain'
import { UpdateProductVariables } from '@/ecommerce/application'
import { useUpdateProduct } from '@/admin/presentation/hooks/use-update-product'

export interface ProductDetailProps {
  product: Product
}

function EditableText({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (value: string) => void
  className: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    onChange(localValue)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setLocalValue(value)
  }

  return (
    <div className="flex flex-row">
      {isEditing ? (
        <div className="flex flex-row">
          <input
            type="text"
            className={cn([
              className,
              'bg-transparent border-none focus:border-none shadow-none focus:shadow-none',
            ])}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
          />
          <button
            className="ml-2 px-2 py-1 rounded-md bg-blue-500 text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="ml-2 px-2 py-1 rounded-md bg-gray-500 text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-row">
          <p className={className}>{value}</p>
          <button
            className="px-2 py-1 rounded-md bg-blue-500 text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

export function ProductDetailEditor({ product }: ProductDetailProps) {
  const [updateProduct, { loading }] = useUpdateProduct({
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <div className="w-full">
      <EditableText
        value={product.name}
        onChange={(name) =>
          updateProduct({
            id: product.id,
            name,
          })
        }
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4"
      />

      <p>{product.description}</p>
    </div>
  )
}
