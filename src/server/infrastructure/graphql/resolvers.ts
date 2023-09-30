import { Repository } from '@/core/domain/entities/repository'
import { Product, create } from '@/ecommerce/domain/entities/product'
import { Category } from '@/ecommerce/domain/entities/category'
import { GetProductsUseCase } from '@/server/application/use-cases/get-products'
import { GetCategoriesUseCase } from '@/server/application/use-cases/get-categories'
import { Resolvers } from '@/server/infrastructure/graphql/generated'

let products: Product[] = []
const categories: Category[] = []

const productsMockRepository: Repository<Product> = {
  findAll: () => Promise.resolve(products),
  findById: (id: string) => Promise.resolve(products.find(product => product.id === id)),
  create: (product: Product) => {
    products.push(product)
    return Promise.resolve(product)
  },
  update: (product: Product) => {
    products = products.map(p => {
      if (p.id === product.id) {
        return product
      }
      return p
    })
    return Promise.resolve(product)
  },
  delete: (id: string) => {
    products = products.filter(product => product.id !== id)
    return Promise.resolve()
  }
}

const resolvers: Resolvers<{
  useCases: {
    getProducts: GetProductsUseCase
    getCategories: GetCategoriesUseCase
  }
}> = {
  Query: {
    products: async (_, {}, context) => {
      return await context.useCases.getProducts.execute()
    },
    categories: async (_, {}, context) => {
      return await context.useCases.getCategories.execute()
    }
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      products.unshift(create({
        ...input,
      }))
      return products[0]
    }
  }
}

export default resolvers