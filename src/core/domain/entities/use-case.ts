export interface UseCase<TVariables = void, TResultData = any> {
  execute: (variables: TVariables) => Promise<TResultData>
}