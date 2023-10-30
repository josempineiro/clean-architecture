import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetCodeVariables, GetCodeResult } from '@/code/application'
import { useCodeApplication } from '@/code/presentation/contexts'

export function useGetCode(
  options?: Omit<UseCaseOptions<GetCodeVariables, GetCodeResult>, 'key'>,
): ReturnType<typeof useUseCaseQuery<GetCodeVariables, GetCodeResult>> {
  const codeApplication = useCodeApplication()
  return useUseCaseQuery(codeApplication.useCases.getCode, {
    key: 'getCode',
    ...options,
  })
}
