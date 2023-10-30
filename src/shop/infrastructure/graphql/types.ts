import { GraphQLClient } from 'graphql-request';
// @ts-ignore
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateProductInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  updateProduct: Product;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  product: Product;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, description: string } };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description: string } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string }> };


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
    // @ts-ignore
    createProduct(variables: CreateProductMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CreateProductMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CreateProductMutation>(CreateProductDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProduct', 'mutation');
    },
    // @ts-ignore
    product(variables: ProductQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ProductQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProductQuery>(ProductDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'product', 'query');
    },
    // @ts-ignore
    products(variables?: ProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProductsQuery>(ProductsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'products', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;