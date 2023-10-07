import { Product } from '@/ecommerce/domain'
import { MockRepository } from '@/core/infrastructure'

export class ProductsMockRepository extends MockRepository<Product> {
  constructor(data: Product[]) {
    super(data)
  }
}