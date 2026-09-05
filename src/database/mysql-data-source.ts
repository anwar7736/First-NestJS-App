import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mariadb',

  host: process.env.MYSQL_DB_HOST || 'mariadb',
  port: Number(process.env.MYSQL_PORT || 3306),

  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_DATABASE,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/postgres/*.js'],

  synchronize: false,
});