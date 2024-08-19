import { type CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
  schema: 'src/graphql/typeDefs/**/*.graphql',
  documents: ['src/**/*.{astro,ts,tsx,mts}'],
  generates: {
    './src/graphql/__generated__/client/': {
      preset: 'client',
      plugins: [],
      presetConfig: { gqlTagName: 'gql' },
      config: { useTypeImports: true }
    },
    './src/graphql/__generated__/': defineConfig({
      resolverGeneration: 'disabled',
      typesPluginsConfig: {
        contextType: '../client.mts#ResolverContext',
        maybeValue: 'T'
      },
      add: {
        './types.generated.ts': { content: '// @ts-nocheck' },
      },
    })
  },
  ignoreNoDocuments: true
}

export default config