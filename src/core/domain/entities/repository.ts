export interface Repository<TEntity> {
  create: (data: TEntity) => Promise<TEntity>
  findById: (id: string) => Promise<TEntity>
  update: (data: TEntity) => Promise<TEntity | undefined>
  findAll: () => Promise<TEntity[]>
  delete: (id: string) => Promise<TEntity | undefined | void>
}
