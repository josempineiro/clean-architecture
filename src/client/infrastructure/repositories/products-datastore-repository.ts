import { Product } from '@/ecommerce/domain'
import { DatastoreRepository } from '@/core/infrastructure'

export class ProductsDatastoreRepository extends DatastoreRepository<Product> {
  constructor() {
    super('products')
  }
}