import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';

export const CreateProductDocument = gql`
    mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    description
  }
}
    `;
export const ProductDocument = gql`
    query product($id: ID!) {
  product(id: $id) {
    id
    name
    description
  }
}
    `;
export const ProductsDocument = gql`
    query products {
  products {
    id
    name
    description
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CreateProductDocumentString = print(CreateProductDocument);
const ProductDocumentString = print(ProductDocument);
const ProductsDocumentString = print(ProductsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createProduct(variables: CreateProductMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CreateProductMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateProductMutation>(CreateProductDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProduct', 'mutation');
    },
    product(variables: ProductQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ProductQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProductQuery>(ProductDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'product', 'query');
    },
    products(variables?: ProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProductsQuery>(ProductsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'products', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;