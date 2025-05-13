import 'dotenv/config'; // load .env variables

import { DataSourceOptions } from "typeorm";
import { Post } from "../posts/entities/post.entity";
import { User } from "../users/entities/user.entity";
import { Subscription } from "../subscriptions/entities/subscription.entity";
import { PostLike } from "../post-likes/entities/post-like.entity";

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Post, User, Subscription, PostLike],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
};