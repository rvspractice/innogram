import 'dotenv/config'; // load .env variables

import { DataSourceOptions } from "typeorm";
import { PostEntity } from "../posts/entities/post.entity";
import { UserEntity } from "../users/entities/user.entity";
import { SubscriptionEntity } from "../subscriptions/entities/subscription.entity";
import { PostLikeEntity } from "../post-likes/entities/post-like.entity";

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [PostEntity, UserEntity, SubscriptionEntity, PostLikeEntity],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
};