import { Category, CategoriesRepository } from '@/ecommerce/domain'

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