import { Code, CodeUtils } from '@/code/domain'
import { MockRepository } from '@/core/infrastructure'
import data from '@/code/infrastructure/mocks/data.json'

export class CodeMockRepository extends MockRepository<Code> {
  constructor() {
    super(data.map(CodeUtils.create), {
      delay: 100,
    })
  }
  getId: (code: Code) => string = (code) => code.path
}
