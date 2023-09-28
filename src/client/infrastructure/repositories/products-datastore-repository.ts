import { Product } from '@/ecommerce/domain/entities/product'
import { DatastoreRepository } from '@/core/infrastructure/repositories/datastore-repository'

export class ProductsDatastoreRepository extends DatastoreRepository<Product> {
  constructor() {
    super('products')
  }
}