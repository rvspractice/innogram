import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostLikeEntity])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
