export interface UseCase<TVariables = unknown, TResultData = unknown> {
  execute: (variables: TVariables) => Promise<TResultData>
}
export interface UseCases<TUseCase extends UseCase> {
  [key: string]: TUseCase
}
