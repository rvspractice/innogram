import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { PostLikeEntity } from '../post-likes/entities/post-like.entity';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubscriptionEntity, PostLikeEntity, PostCommentEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
