import { Application } from '@/core/domain'
import { GetCodeUseCase } from '@/code/application/use-cases/get-code'
import { CodeRepository } from '@/code/domain'

export * from '@/code/application/use-cases/get-code'

export type CodeApplicationUseCase = GetCodeUseCase

export type CodeApplicationDependencies = {
  codeRepository: CodeRepository
}


export interface CodeApplicationUseCases extends Record<string, CodeApplicationUseCase> {
  getCode: GetCodeUseCase
}

export class CodeApplication extends Application<CodeApplicationUseCases> {
  constructor(readonly dependencies: CodeApplicationDependencies) {
    super({
      getCode: new GetCodeUseCase(dependencies)
    })
  }
}
