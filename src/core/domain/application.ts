import { UseCase } from "./use-case";
import { Repository } from "./repository";

export interface Application {
  useCases: Record<string, UseCase>
}