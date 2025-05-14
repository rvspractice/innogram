import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity, UserEntity])],
  providers: [PostCommentsService],
  controllers: [PostCommentsController]
})
export class PostCommentsModule {}
