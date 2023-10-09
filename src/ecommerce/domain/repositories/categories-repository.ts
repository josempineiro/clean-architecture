import { Repository } from '@/core/domain'
import { Category } from '@/ecommerce/domain/entities/category'

export interface CategoriesRepository extends Repository<Category> {}
