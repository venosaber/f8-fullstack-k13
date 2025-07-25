import { BaseEntity } from './entities';
import {
  Repository,
  SelectQueryBuilder,
  InsertQueryBuilder,
  UpdateQueryBuilder,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<Entity extends BaseEntity> {
  constructor(protected repository: Repository<Entity>) {}

  protected getPublicColumns() {
    const privateColumns = [
      'createdAt',
      'createdBy',
      'modifiedAt',
      'modifiedBy',
      'deletedAt',
      'deletedBy',
      'active',
    ];
    const columns = this.repository.metadata.columns.map(
      (column) => column.propertyName,
    );
    return columns.filter((col) => !privateColumns.includes(col));
  }

  protected getTableName() {
    return this.repository.metadata.tableName;
  }

  protected handleSelect(): SelectQueryBuilder<Entity> {
    const query: SelectQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .select(this.getPublicColumns());
    return query;
  }

  protected handleWhere(
    query: SelectQueryBuilder<Entity>,
    condition: Partial<Record<keyof Entity, any>>,
  ): SelectQueryBuilder<Entity> {
    return query.where({ ...condition });
  }

  async find(condition = {}) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { ...condition, active: true } as Partial<
      Record<keyof Entity, any>
    >);
    return (await query.execute()) as Entity[];
  }

  async findOne(id: number) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { id, active: true } as Partial<
      Record<keyof Entity, any>
    >);
    return (await query.execute()) as Entity;
  }

  async create(data: QueryDeepPartialEntity<Entity>) {
    const query: InsertQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .insert()
      .values(data)
      .returning(this.getPublicColumns());

    const response: InsertResult = await query.execute();
    return response.raw as Entity;
  }

  async updateOne(id: number, data: QueryDeepPartialEntity<Entity>) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set(data)
      .where('id = :id', { id })
      .returning(this.getPublicColumns());

    const response: UpdateResult = await query.execute();

    return response.raw as Entity;
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

    try {
      const result: UpdateResult = await query.execute();
      // Check if there are any changed records
      if (result.affected === 0) {
        throw new Error('No records were updated');
      }
      return { msg: 'Deleted successfully' };
    } catch {
      return { msg: 'Failed to delete' };
    }
  }
}
