import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLikeEntity } from './entities/post-like.entity';
import { Repository } from 'typeorm';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';

@Injectable()
export class PostLikesService {
    constructor(
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
    ) { }

    async findPostLike(id: string): Promise<PostLikeEntity> {
        const postLike = await this.postLikesRepository.findOneBy({ id });

        if (!postLike) {
            throw new NotFoundException(`Like with ID "${id}" not found`);
        }

        return postLike;
    }

    async removePostLike(id: string): Promise<void> {
        await this.postLikesRepository.delete(id);
    }

    async createPostLike(createPostLikeDto: CreatePostLikeDto): Promise<PostLikeEntity> {
        const [creator, post] = await Promise.all([
            this.userRepository.findOneBy({ id: createPostLikeDto.userId }),
            this.postsRepository.findOneBy({ id: createPostLikeDto.postId }),
        ]);

        if (!creator) {
            throw new NotFoundException(`User with id ${createPostLikeDto.userId} not found`);
        }

        if (!post) {
            throw new NotFoundException(`Post with id ${createPostLikeDto.postId} not found`);
        }

        const postLike = new PostLikeEntity();
        postLike.user = creator;
        postLike.post = post;

        return this.postLikesRepository.save(postLike);
    }

}
