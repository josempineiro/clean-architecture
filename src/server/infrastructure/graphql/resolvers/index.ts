import { Products } from '@/ecommerce/domain'
import { Resolvers } from '@/server/infrastructure/graphql/generated'
import { ServerApplicationUseCases } from "@/server/application"

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
      const newProduct = Products.create({
        name: input.name,
        description: input.description,
      })
      return await context.useCases.createProduct.execute(newProduct)
    }
  }
}

export default resolvers