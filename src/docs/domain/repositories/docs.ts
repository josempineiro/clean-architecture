import { Repository } from '@/core/domain'
import { Doc } from '@/docs/domain/entities/doc'

export interface DocsRepository extends Repository<Doc> {}
