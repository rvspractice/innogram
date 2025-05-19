import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostLikeEntity } from '../post-likes/entities/post-like.entity';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostLikeEntity, PostCommentEntity])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
