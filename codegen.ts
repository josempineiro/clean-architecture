import type { CodegenConfig } from '@graphql-codegen/cli'

// TODO: generate diferents configs for each module

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: [
    'src/admin/infrastructure/graphql/documents/**/*.graphql',
    'src/shop/infrastructure/graphql/documents/**/*.graphql'
  ],
  generates: {
    'src/ecommerce/infrastructure/graphql/types.ts': {
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
