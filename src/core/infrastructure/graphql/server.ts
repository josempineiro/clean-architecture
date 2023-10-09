import { Application } from '@/core/domain'
import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

interface GraphQLServerContext<TApplication extends Application>
  extends BaseContext {
  application: TApplication
  req: any
  res: any
}

export type GraphQLServerOptions<TApplication extends Application> =
  ApolloServerOptions<GraphQLServerContext<TApplication>> & {
    application: TApplication
  }

export class GraphQLServer<
  TApplication extends Application,
> extends ApolloServer<{
  application: TApplication
}> {
  constructor({ application, ...rest }: GraphQLServerOptions<TApplication>) {
    super({
      ...rest,
      context: async () => ({ application }),
      // @ts-ignore
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    })
  }
}
