import {
  InsertQueryBuilder,
  Repository,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './entities';

export class BaseService<Entity extends BaseEntity> {
  constructor(protected repository: Repository<Entity>) {}

  protected getTableName() {
    return this.repository.metadata.tableName;
  }

  protected handleSelect(): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(this.getTableName()).select();
  }

  protected handleWhere(
    query: SelectQueryBuilder<Entity>,
    condition: Partial<Record<keyof Entity, any>>,
  ): SelectQueryBuilder<Entity> {
    return query.where({ ...condition });
  }

  async find() {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { active: true } as Partial<
      Record<keyof Entity, any>
    >);

    return query.getMany();
  }

  async findOne(id: number) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { id, active: true } as Partial<
      Record<keyof Entity, any>
    >);

    return query.getOne();
  }

  async create(data: QueryDeepPartialEntity<Entity>) {
    const query: InsertQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .insert()
      .values(data);

    await query.execute();
  }

  async updateOne(id: number, data: QueryDeepPartialEntity<Entity>) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set(data)
      .where('id = :id', { id });

    await query.execute();
  }

  async softDelete(id: number) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set({
        active: false,
        deletedAt: new Date(),
      } as Partial<Record<keyof Entity, any>>)
      .where('id = :id', { id });

    await query.execute();
  }
}
