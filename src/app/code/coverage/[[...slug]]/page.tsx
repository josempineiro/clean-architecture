'use client'

import { CodeCoverageView } from '@/code/presentation'

export default function Page({ params }: { params: any }) {
  return <CodeCoverageView path={params.slug.join('/')} />
}
