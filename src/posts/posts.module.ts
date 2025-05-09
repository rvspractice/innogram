import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLike } from 'src/post-likes/entities/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostLike])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
