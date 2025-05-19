import 'dotenv/config'; // load .env variables
import * as path from 'path';

import { DataSourceOptions } from "typeorm";

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Set to false in production !!
  migrations: [path.join(__dirname, '../migrations/*.ts')],
};