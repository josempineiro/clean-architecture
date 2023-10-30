import { Application } from '@/core/domain'
import { GetDocsUseCase } from '@/docs/application/use-cases/get-docs'

export * from '@/docs/application/use-cases/get-docs'

export type DocsUseCase = GetDocsUseCase 

export type DocsUseCases = Record<string, DocsUseCase>

import { DocsRepository } from '@/docs/domain'

export * from '@/admin/application/use-cases/create-product'
export * from '@/admin/application/use-cases/get-products'

export type DocsApplicationDependencies = {
  docsRepository: DocsRepository
}

export interface DocsApplicationUseCases extends Record<string, DocsUseCase> {
  getDocs: GetDocsUseCase
}

export class DocsApplication extends Application<DocsApplicationUseCases> {
  constructor(dependencies: DocsApplicationDependencies) {
    super({
      getDocs: new GetDocsUseCase(dependencies),
    })
  }
}
