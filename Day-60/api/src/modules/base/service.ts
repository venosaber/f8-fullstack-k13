import { BaseEntity } from '@/modules/base/entity';
import {
  Repository,
  SelectQueryBuilder,
  InsertQueryBuilder,
  UpdateQueryBuilder,
  InsertResult,
  UpdateResult,
} from 'typeorm';
import { BaseServiceI } from '@/shares';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export abstract class BaseService<
  Entity extends BaseEntity,
  RequestI,
  ResponseI,
> implements BaseServiceI<RequestI, ResponseI>
{
  protected constructor(protected repository: Repository<Entity>) {}

  protected getPublicColumns() {
    const privateColumns: string[] = [
      'createdAt',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'active',
    ];
    const columns: string[] = this.repository.metadata.columns.map(
      (column) => column.propertyName,
    );
    return columns.filter((column) => !privateColumns.includes(column));
  }

  protected getTableName() {
    return this.repository.metadata.tableName;
  }

  protected handleSelect(): SelectQueryBuilder<Entity> {
    return this.repository
      .createQueryBuilder(this.getTableName())
      .select(this.getPublicColumns());
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
    return await query.getRawMany<ResponseI>();
  }

  async findOne(id: number) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { id, active: true } as Partial<
      Record<keyof Entity, any>
    >);
    const response = await query.getRawOne<ResponseI>();
    if (!response) {
      throw new NotFoundException('Record not found');
    }
    return response;
  }

  async findOneBy(condition = {}) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleWhere(query, { ...condition, active: true } as Partial<
      Record<keyof Entity, any>
    >);
    const response = await query.getRawOne<ResponseI>();
    if (!response) return null;
    return response;
  }

  async create(data) {
    const query: InsertQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .insert()
      .values(data)
      .returning(this.getPublicColumns());
    const response: InsertResult = await query.execute();
    if (
      !response ||
      !Array.isArray(response.raw) ||
      response.raw.length === 0
    ) {
      throw new InternalServerErrorException('Failed to create new record');
    }
    return response.raw[0] as ResponseI;
  }

  async updateOne(id: number, data) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set(data)
      .where('id = :id and active = :active', { id, active: true })
      .returning(this.getPublicColumns());

    const response: UpdateResult = await query.execute();
    if (
      !response ||
      !Array.isArray(response.raw) ||
      response.raw.length === 0
    ) {
      throw new InternalServerErrorException('Failed to update record');
    }
    return response.raw[0] as ResponseI;
  }

  async softDelete(id: number) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set({ deletedAt: () => 'CURRENT_TIMESTAMP', active: false } as Partial<
        Record<keyof Entity, any>
      >)
      .where('id = :id and active = :active', { id, active: true });

    const response: UpdateResult = await query.execute();
    if (response.affected === 0) {
      throw new InternalServerErrorException(
        'Record not found or already deleted',
      );
    }
    return {
      msg: 'Successfully deleted',
    };
  }
}
