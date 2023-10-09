import { Repository } from '@/core/domain'
import { Product } from '@/ecommerce/domain/entities/product'

export interface ProductsRepository extends Repository<Product> {}
