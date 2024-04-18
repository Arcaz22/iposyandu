import { IbuHamil } from '@app/shared';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [IbuHamil],
  migrations: ['dist/apps/ibu-hamil/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
