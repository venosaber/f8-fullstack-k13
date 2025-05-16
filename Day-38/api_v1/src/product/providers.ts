import { DataSource } from 'typeorm';
import { ProductEntity } from './entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
    inject: ['DATA_SOURCE'],
  },
];