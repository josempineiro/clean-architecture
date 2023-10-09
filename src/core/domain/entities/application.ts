import { UseCase } from '@/core/domain/entities/use-case'

export interface Application<
  UseCases extends Record<string, UseCase<any, any>> = any,
> {
  useCases: UseCases
}
