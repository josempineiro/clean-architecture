import { CodeCoverageChart } from '@/code/presentation/components'
import { useGetCode } from '@/code/presentation/hooks'

export interface CodeCoverageViewProps {
  path: string
}

export function CodeCoverageView({ path }: CodeCoverageViewProps) {
  const { data: code, isLoading } = useGetCode({
    variables: {
      path,
    },
  })
  if (isLoading) {
    return <div>Loading...</div>
  } else if (code) {
    return <CodeCoverageChart codeCoverage={code.coverage} />
  }
}
