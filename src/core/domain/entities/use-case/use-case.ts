export interface UseCase<Variables = unknown, Result = unknown> {
  execute: (variables: Variables) => Promise<Result>
}
export interface UseCases<TUseCase extends UseCase> {
  [key: string]: TUseCase
}
