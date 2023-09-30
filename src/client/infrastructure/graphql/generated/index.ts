import { GraphQLClient } from 'graphql-request';
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

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateProductInput = {
  categories: Array<Scalars['ID']['input']>;
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type Price = {
  __typename?: 'Price';
  currency: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Product = {
  __typename?: 'Product';
  categories: Array<Category>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Price;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  products: Array<Product>;
};

export type UpdateProductInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string }> };


export const CategoriesDocument = gql`
    query categories {
  categories {
    id
    name
  }
}
    `;
export const ProductsDocument = gql`
    query products {
  products {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CategoriesDocumentString = print(CategoriesDocument);
const ProductsDocumentString = print(ProductsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    // @ts-ignore
    categories(variables?: CategoriesQueryVariables, requestHeaders?: any): Promise<{ data: CategoriesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CategoriesQuery>(CategoriesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'categories', 'query');
    },
    // @ts-ignore
    products(variables?: ProductsQueryVariables, requestHeaders?: any): Promise<{ data: ProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ProductsQuery>(ProductsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'products', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;