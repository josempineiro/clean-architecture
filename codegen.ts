import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'src/shop/infrastructure/graphql/documents/**/*.graphql',
  generates: {
    'src/shop/infrastructure/graphql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: true,
      },
    },
    'src/server/infrastructure/graphql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
      },
    },
  },
}

export default config
