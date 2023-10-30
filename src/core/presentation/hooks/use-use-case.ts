import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UseCase } from '@/core/domain'

export interface UseCaseOptions<TVariables, TResult> {
  key: string
  variables?: TVariables
  onSuccess?: (result: TResult) => void
  onError?: (error: string) => void
}
export interface UseCaseMutationOptions<TVariables, TResult>  extends UseCaseOptions<TVariables, TResult> {
  updateKey:  unknown[] | ((variables: TVariables) => unknown[])
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
    [key, variables],
    () => useCase.execute(variables as TVariables),
    {
      onError,
    },
  )
  return {
    data: query.data,
    isLoading: query.isLoading || query.isFetching,
    error: query.error || '',
  }
}

export function useUseCaseMutation<TVariables, TResult>(
  useCase: UseCase<TVariables, TResult>,
  {updateKey, ...options}: UseCaseMutationOptions<TVariables, TResult>,
): [
  (executionParameters: TVariables) => void,
  {
    loading: boolean
    error: string
  },
] {
  const queryClient = useQueryClient()

  const { key, variables, onSuccess, onError } = options
  const mutation = useMutation<TResult, string, TVariables>(
    [key],
    (executionVariables: TVariables) =>
      useCase.execute(executionVariables),
    {
      onSuccess: (result, variables) => {
        if (updateKey) {
          if (typeof updateKey === 'function') {
            queryClient.invalidateQueries(updateKey(variables));
          } else {
            queryClient.invalidateQueries(updateKey);
          }
        }
        onSuccess && onSuccess(result)
      },
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
