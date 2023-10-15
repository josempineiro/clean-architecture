import { Resolvers } from '@/server/infrastructure/graphql/types'
import { GraphQLServerContext } from '@/server/infrastructure/graphql/context'

export const resolvers: Resolvers<GraphQLServerContext> = {
  Query: {
    product: async (_, { id }, { application }) =>
      application.useCases.getProduct.execute({ id }),
    products: async (_, {}, { application }) =>
      application.useCases.getProducts.execute(),
  },
  Mutation: {
    createProduct: async (_, { input }, { application }) =>
      application.useCases.createProduct.execute(input),
    updateProduct: async (_, { id, input }, { application }) =>
      application.useCases.updateProduct.execute({
        id,
        ...(input.name && { name: input.name }), 
        ...(input.description && { name: input.description }), 
      }),
  },
}
