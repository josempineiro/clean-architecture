import { useMutation, useQuery } from "@tanstack/react-query";
import { UseCase } from "@/core/domain/entities/use-case";

export interface UseCaseOptions<TVariables, TResult> {
  key: string;
  variables?: TVariables;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
}

export function useUseCaseQuery<TVariables, TResult>(useCase: UseCase<TVariables,TResult>, options: UseCaseOptions<TVariables,TResult>) {
  const { key, variables, onError } = options;
  return useQuery<
  TResult,
  string,
  TVariables
  >([
    key,
    variables
  ], () => useCase.execute(variables), {
    onError,
  });
}

export function useUseCaseMutation<TVariables, TResult>(useCase: UseCase<TVariables, TResult>, options: UseCaseOptions<TVariables, TResult>): [
  (executionParameters: TVariables) => void,
  {
    loading: boolean;
    error: string;
  }
] {
  const { key, variables, onSuccess, onError } = options;
  const mutation = useMutation<
  TResult,
  string,
  TVariables
  >([
    key
  ], (executionVariables: TVariables) => useCase.execute({
    ...variables,
    ...executionVariables
  }),
  {
    onSuccess,
    onError,
  });
  return [mutation.mutate, {
    loading: mutation.isLoading,
    error: mutation.error || ''
  }]
}