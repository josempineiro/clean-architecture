import { useMutation, useQuery } from '@tanstack/react-query'
import { UseCase } from '@/core/domain'

export interface UseCaseOptions<TVariables, TResult> {
  key: string
  variables?: TVariables
  onSuccess?: (result: TResult) => void
  onError?: (error: string) => void
}

export interface UseCaseResults<TVariables, TResult> {
  data: TResult | undefined
  isLoading: boolean
  error: string | undefined
}

export function useUseCaseQuery<TVariables, TResult>(
  useCase: UseCase<TVariables, TResult>,
  options: UseCaseOptions<TVariables, TResult>,
): UseCaseResults<TVariables, TResult> {
  const { key, variables, onError } = options
  const query = useQuery(
    [key],
    () => useCase.execute(variables as TVariables),
    {
      onError,
    },
  )
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error || '',
  }
}

export function useUseCaseMutation<TVariables, TResult>(
  useCase: UseCase<TVariables, TResult>,
  options: UseCaseOptions<TVariables, TResult>,
): [
  (executionParameters: TVariables) => void,
  {
    loading: boolean
    error: string
  },
] {
  const { key, variables, onSuccess, onError } = options
  const mutation = useMutation<TResult, string, TVariables>(
    [key],
    (executionVariables: TVariables) =>
      useCase.execute({
        ...variables,
        ...executionVariables,
      }),
    {
      onSuccess,
      onError,
    },
  )
  return [
    mutation.mutate,
    {
      loading: mutation.isLoading,
      error: mutation.error || '',
    },
  ]
}
