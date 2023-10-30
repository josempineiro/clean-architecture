import { UseCase } from '@/core/domain'
import { Code, CodeRepository } from '@/code/domain'

export type GetCodeVariables = {
  path: string
}

export type GetCodeDependencies = {
  codeRepository: CodeRepository
}

export type GetCodeResult = Code

export class GetCodeUseCase implements UseCase<GetCodeVariables, GetCodeResult>
{
  public dependencies: GetCodeDependencies

  constructor(dependencies: GetCodeDependencies) {
    this.dependencies = dependencies
  }
  execute(variables: GetCodeVariables): Promise<GetCodeResult> {
    return this.dependencies.codeRepository.getById(variables.path)
  }
}
