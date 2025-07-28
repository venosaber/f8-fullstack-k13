import {
  Injectable,
  Inject,
  NotFoundException,
  GoneException,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  InsertQueryBuilder,
  InsertResult,
  Repository,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { ImageEntity } from './entity';
import {
  ImageEntityRepository,
  ImageReqI,
  ImageResI,
  ImageServiceI,
} from '@/shares';
import { ImageI } from '@/shares/type/image';

@Injectable()
export class ImageService implements ImageServiceI {
  constructor(
    @Inject(ImageEntityRepository)
    protected repository: Repository<ImageEntity>,
  ) {}

  protected getPublicColumns() {
    const privateColumns: string[] = [];
    const columns: string[] = this.repository.metadata.columns.map(
      (column) => column.propertyName,
    );
    return columns.filter((column) => !privateColumns.includes(column));
  }

  protected getTableName() {
    return this.repository.metadata.tableName;
  }

  protected handleSelect(): SelectQueryBuilder<ImageEntity> {
    const query: SelectQueryBuilder<ImageEntity> = this.repository
      .createQueryBuilder(this.getTableName())
      .select(this.getPublicColumns());
    return query;
  }

  protected handleWhere(
    query: SelectQueryBuilder<ImageEntity>,
    condition: Partial<Record<keyof ImageEntity, any>>,
  ): SelectQueryBuilder<ImageEntity> {
    return query.where({ ...condition });
  }

  async find(condition = {}) {
    let query: SelectQueryBuilder<ImageEntity> = this.handleSelect();
    query = this.handleWhere(query, { ...condition, is_deleted: false });
    return await query.getRawMany<ImageI>();
  }

  async findOne(id: number) {
    let query: SelectQueryBuilder<ImageEntity> = this.handleSelect();
    query = this.handleWhere(query, { id });
    const response: ImageI | undefined = await query.getRawOne();
    if (!response) throw new NotFoundException('Image Not Found');
    if (response.is_deleted) throw new GoneException('Image Deleted');
    return response;
  }

  async create(data: ImageReqI) {
    try {
      const query: InsertQueryBuilder<ImageEntity> = this.repository
        .createQueryBuilder(this.getTableName())
        .insert()
        .values(data)
        .returning(this.getPublicColumns());

      const response: InsertResult = await query.execute();

      if (
        !response.raw ||
        !Array.isArray(response.raw) ||
        response.raw.length === 0
      ) {
        throw new InternalServerErrorException('Failed to create image');
      }
      return response.raw[0] as ImageResI;
    } catch {
      throw new InternalServerErrorException('Failed to create image');
    }
  }

  async softDelete(id: number) {
    const query: UpdateQueryBuilder<ImageEntity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set({ is_deleted: true, deleted_at: () => 'CURRENT_TIMESTAMP' })
      .where('id = :id and is_deleted = :is_deleted', {
        id,
        is_deleted: false,
      });

    const response: UpdateResult = await query.execute();
    // Check if there are any changed records
    if (response.affected === 0) {
      throw new NotFoundException('Image not found or already deleted');
    }
    return { msg: 'Deleted successfully!' };
  }
}
