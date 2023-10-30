import { Doc, DocUtils } from '@/docs/domain'
import { MockRepository } from '@/core/infrastructure'
import docs from '@/docs/infrastructure/mocks/data.json'

export class DocsMockRepository extends MockRepository<Doc> {
  constructor() {
    super(docs.map(DocUtils.create), {
      delay: 100,
    })
  }
}
