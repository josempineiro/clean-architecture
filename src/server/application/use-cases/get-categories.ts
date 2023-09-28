import { Category } from '@/ecommerce/domain/entities/category'
import { CategoriesRepository } from '@/ecommerce/domain/repositories/categories-repository'

export interface GetCategories {
  execute(): Promise<Category[]>
}

export class GetCategoriesUseCase implements GetCategories {
  constructor(
    private readonly categoryRepository: CategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }
}