import { Event } from '@app/shared';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [Event],
  migrations: ['dist/apps/Event/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
