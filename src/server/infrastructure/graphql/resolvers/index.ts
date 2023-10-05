import { Product, ProductsRepository, Products } from '@/ecommerce/domain'
import { Resolvers } from '@/server/infrastructure/graphql/generated'
import { ServerApplicationUseCases } from "@/server/application"

let products: Product[] = []

const productsMockRepository: ProductsRepository = {
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
  useCases: ServerApplicationUseCases
}> = {
  Query: {
    products: async (_, {}, context) => {
      return await context.useCases.getProducts.execute()
    }
  },
  Mutation: {
    createProduct: async (_, { input }, context) => {
      return await context.useCases.createProduct.execute(Products.create(input))
    }
  }
}

export default resolvers