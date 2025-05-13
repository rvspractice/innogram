import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env variables
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    PostsModule,
    SubscriptionsModule,
    PostLikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
