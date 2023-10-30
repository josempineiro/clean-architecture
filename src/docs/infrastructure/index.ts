import { DocsRepository } from '@/docs/domain'
import { DocsMockRepository } from '@/docs/infrastructure/mocks'

type Environment = 'development' | 'test' | 'production'

const ENV: Environment = 'production' as Environment

export const docsRepository = (
  (ENV === 'test' && new DocsMockRepository()) ||
  (ENV === 'development' && new DocsMockRepository()) ||
  (ENV === 'production' && new DocsMockRepository())
) as DocsRepository
