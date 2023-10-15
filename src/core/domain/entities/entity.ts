export interface Entity extends Record<string, unknown> {
  _type: string
}

export interface EntityUtils<TEntity extends Entity> {
  create: (entity: Partial<TEntity>) => TEntity
  is: (entity: unknown) => entity is TEntity
}