export interface Repository<TEntity> {
  create: (data: TEntity) => Promise<TEntity>
  findById: (id: string) => Promise<TEntity>
  updateById: (id: string, data: Partial<TEntity>) => Promise<TEntity>
  findAll: () => Promise<TEntity[]>
  delete: (id: string) => Promise<TEntity | undefined | void>
}
