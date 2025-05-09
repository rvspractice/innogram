import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { PostsModule } from './posts/posts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import { PostLike } from './post-likes/entities/post-like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [User, Post, Subscription, PostLike],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    SubscriptionsModule,
    PostLikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
