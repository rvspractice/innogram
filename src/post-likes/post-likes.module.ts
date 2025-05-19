import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { PostLikesController } from './post-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikeEntity } from './entities/post-like.entity';
import { UserEntity } from '../users/entities/user.entity';
import { PostEntity } from '../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeEntity, UserEntity, PostEntity])],
  providers: [PostLikesService],
  controllers: [PostLikesController]
})
export class PostLikesModule {}
