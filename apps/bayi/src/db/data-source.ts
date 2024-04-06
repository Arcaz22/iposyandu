import { Bayi } from '@app/shared';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [Bayi],
  migrations: ['dist/apps/bayi/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
