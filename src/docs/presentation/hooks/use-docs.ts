import { useUseCaseQuery, UseCaseOptions } from '@/core/presentation'
import { GetDocsResult } from '@/docs/application'
import { useDocsApplication } from '@/docs/presentation/contexts'

export function useGetDocs(
  options?: UseCaseOptions<void, GetDocsResult>,
): ReturnType<typeof useUseCaseQuery<void, GetDocsResult>> {
  const docsApplication = useDocsApplication()
  return useUseCaseQuery<void, GetDocsResult>(docsApplication.useCases.getDocs, {
    key: 'getDocs',
    ...options,
  })
}
