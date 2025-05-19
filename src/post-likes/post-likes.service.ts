import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppErrorCode } from '../shared/error-codes.enums';
import { PostLikeEntity } from './entities/post-like.entity';
import { Repository } from 'typeorm';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UserEntity } from '../users/entities/user.entity';
import { PostEntity } from '../posts/entities/post.entity';

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
            throw new NotFoundException(AppErrorCode.LIKE_NOT_FOUND);
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
            throw new NotFoundException(AppErrorCode.USER_NOT_FOUND);
        }

        if (!post) {
            throw new NotFoundException(AppErrorCode.POST_NOT_FOUND);
        }

        const postLike = this.postLikesRepository.create({user: creator, post})

        return this.postLikesRepository.save(postLike);
    }

}
