import { UseCase } from '@/core/domain/entities/use-case'

export abstract class Application<
  UseCases extends Record<string, UseCase<any, any>> = any,
> {
  useCases: UseCases
  constructor(useCases: UseCases) {
    this.useCases = useCases
  }
}
