import { Product } from '@/ecommerce/domain'
import { DatastoreRepository } from '@/core/infrastructure/repositories/datastore-repository'

export class ProductsDatastoreRepository extends DatastoreRepository<Product> {
  constructor() {
    super('products')
  }
}