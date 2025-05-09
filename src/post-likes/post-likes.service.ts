import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLike } from './entities/post-like.entity';
import { Repository } from 'typeorm';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class PostLikesService {
    constructor(
        @InjectRepository(PostLike)
        private postLikesRepository: Repository<PostLike>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) { }

    async findAllPostLikes(): Promise<PostLike[]> {
        return this.postLikesRepository.find({ relations: ['user', 'post'] });
    }

    async findPostLike(id: string): Promise<PostLike | null> {
        return this.postLikesRepository.findOne({ where: { id }, relations: ['user', 'post'] });
    }

    async removePostLike(id: string): Promise<void> {
        await this.postLikesRepository.delete(id);
    }

    async createPostLike(createPostLikeDto: CreatePostLikeDto): Promise<PostLike> {
        const creator = await this.userRepository.findOneBy({ id: createPostLikeDto.userId });

        if (!creator) {
            throw new Error(`User with id ${createPostLikeDto.userId} not found`);
        }

        const post = await this.postsRepository.findOneBy({ id: createPostLikeDto.postId });

        if (!post) {
            throw new Error(`Post with id ${createPostLikeDto.postId} not found`);
        }

        const postLike = new PostLike();
        postLike.user = creator;
        postLike.post = post;
        postLike.createdAt = new Date();

        return this.postLikesRepository.save(postLike);
    }

}
