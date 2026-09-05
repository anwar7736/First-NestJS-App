import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',

  host: process.env.PGSQL_DB_HOST || 'postgres',
  port: Number(process.env.MYSQL_PORT || 5432),

  username: process.env.PGSQL_DB_USERNAME,
  password: process.env.PGSQL_DB_PASSWORD,
  database: process.env.PGSQL_DB_DATABASE,

  entities: ['src/**/*.entity.ts'],

  migrations: ['src/migrations/postgres/*.ts'],

  synchronize: false,
});