import { useRef, useState } from 'react'
import {
  ProductsRepository,
  Product,
  ProductUtils,
} from '@/core/domain/entities/repository/repository.sample'
import {
  Button,
  IconButton,
  Input,
  Alert,
  AlertProps,
  CrossIcon,
} from '@/core/presentation'

interface RepositoryPlaygroundOperationAlert extends AlertProps {
  type: 'info' | 'danger' | 'success' | 'warning' | 'default'
  message: string
}

export default function RepositoryPlayground() {
  const [operations, setOperations] = useState<
    RepositoryPlaygroundOperationAlert[]
  >([])
  const [products, setProducts] = useState<Product[]>([])
  const repository = useRef(new ProductsRepository())
  const count = useRef(0)

  function saveOperation(operation: RepositoryPlaygroundOperationAlert) {
    setOperations((operations) => [...operations, operation])
  }
  function handleError(error: Error) {
    debugger
    saveOperation({
      message: error.message,
      type: 'danger',
    })
  }
  const handleCreate = () => {
    repository.current
      .create(ProductUtils.create({ name: `Product ${count.current++}` }))
      .then((product) => {
        saveOperation({
          message: `Created product ${product.id}`,
          type: 'success',
        })
      })
      .catch(handleError)
  }
  const handleGetAll = () => {
    repository.current.getAll().then((products) => {
      saveOperation({
        message: `Getted all products: ${products.length}`,
        type: 'default',
      })
      setProducts(products)
    })
  }

  const handleUpdate = (product: Product) => {
    repository.current
      .updateById(product.id, {
        name: `Product ${count.current++}`,
      })
      .then(() => {
        saveOperation({
          message: `Updated product ${product.id}`,
          type: 'info',
        })
      })
      .catch(handleError)
  }
  const handleDelete = (product: Product) => {
    repository.current
      .deleteById(product.id)
      .then(() => {
        saveOperation({
          message: `Deleted product ${product.id}`,
          type: 'warning',
        })
      })
      .catch(handleError)
  }

  return (
    <>
      <div className="px-10 flex flex-col gap-10">
        <div className="flex gap-10">
          <Button onClick={handleCreate}>Create Product</Button>
          <Button onClick={handleGetAll}>Get products</Button>
        </div>
        <div className="flex gap-10">
          <div className="flex-1 flex flex-col gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex gap-4">
                <Input
                  defaultValue={product.name}
                  onBlur={(event) => {
                    handleUpdate({ ...product, name: event.target.value })
                  }}
                />
                <IconButton onClick={() => handleDelete(product)}>
                  <CrossIcon className="w-6 h-6" />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="flex flex-1">
            <div className="flex flex-col-reverse w-full gap-4">
              {operations.map((operation, index) => (
                <Alert
                  key={index}
                  className="w-full"
                  message={operation.message}
                  type={operation.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
