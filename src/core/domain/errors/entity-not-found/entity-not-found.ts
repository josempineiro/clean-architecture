export class EntityNotFound extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found. Please enter a existing entity id.`);
  }
}