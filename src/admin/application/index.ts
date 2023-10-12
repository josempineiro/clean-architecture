import { EcommerceApplication, EcommerceUseCases } from '@/ecommerce/application'
import { CreateProductAdminUseCase } from '@/admin/application/use-cases/create-product'
import { GetProductsAdminUseCase } from '@/admin/application/use-cases/get-products'
import { GetProductAdminUseCase } from '@/admin/application/use-cases/get-product'
import { ProductsRepository } from '@/ecommerce/domain'

export * from '@/admin/application/use-cases/create-product'
export * from '@/admin/application/use-cases/get-products'

export type AdminApplicationDependencies = {
  productsRepository: ProductsRepository
}

export interface AdminApplicationUseCases extends EcommerceUseCases {
  createProduct: CreateProductAdminUseCase
  getProducts: GetProductsAdminUseCase
  getProduct: GetProductAdminUseCase
}

export class AdminApplication extends EcommerceApplication<AdminApplicationUseCases> {
  constructor(readonly dependencies: AdminApplicationDependencies) {
    super({
      getProducts: new GetProductsAdminUseCase(dependencies),
      createProduct: new CreateProductAdminUseCase(dependencies),
      getProduct: new GetProductAdminUseCase(dependencies),
    })
  }
}
