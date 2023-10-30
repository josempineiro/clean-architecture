import { UseCase } from '@/core/domain'
import { Doc } from '@/docs/domain/entities/doc'
import type { DocsApplicationDependencies } from '@/docs/application'

export type GetDocsVariables = void

export type GetDocsResult = Array<Doc>

export class GetDocsUseCase implements UseCase<GetDocsVariables, GetDocsResult> {
  public dependencies: DocsApplicationDependencies
  constructor(dependencies: DocsApplicationDependencies) {
    this.dependencies = dependencies
  }
  async execute(): Promise<GetDocsResult> {
    return await this.dependencies.docsRepository.getAll()
  }
}
