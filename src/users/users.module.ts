import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubscriptionEntity, PostLikeEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
