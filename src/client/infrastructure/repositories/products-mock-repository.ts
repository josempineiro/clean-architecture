import { Product } from '@/ecommerce/domain'
import { MockRepository } from '@/core/infrastructure/repositories/mock-repository'

export class ProductsMockRepository extends MockRepository<Product> {
  constructor() {
    super()
  }
}