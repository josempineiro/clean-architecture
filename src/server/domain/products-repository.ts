import { Product } from '@/ecommerce/domain'
import { Repository } from '@/core/domain'

export interface ProductsRepository extends Repository<Product> {}
