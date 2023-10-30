export interface Entity extends Record<string, unknown> {
  _type: string
}

export interface EntityUtils<TEntity extends Entity> {
  getId: (entity: TEntity) => string
  create: (entity: Partial<TEntity>) => TEntity
  is: (entity: any) => entity is TEntity
}