import { Products } from '@/ecommerce/domain'
import { Resolvers } from '@/server/infrastructure/graphql/generated'
import { ServerEcommerceApplication } from "@/server/application"

const resolvers: Resolvers<ServerEcommerceApplication> = {
  Query: {
    products: async (_, {}, context) => {
      return await context.useCases.getProducts.execute()
    },
    product: async (_, { id }, context) => {
      return await context.useCases.getProduct.execute({ id })
    }
  },
  Mutation: {
    createProduct: async (_, { input }, context) => {
      const newProduct = Products.create({
        name: input.name,
        description: input.description,
      })
      return await context.useCases.createProduct.execute(newProduct)
    }
  }
}

export default resolvers