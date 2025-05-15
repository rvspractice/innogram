import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
    ) { }

    findAllPosts(): Promise<PostEntity[]> {
        return this.postsRepository.find({ relations: ['author'] });
    }

    async findPost(id: string): Promise<PostEntity> {
        const post = await this.postsRepository.findOneBy({ id });

        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }

        return post;
    }


    async removePost(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
        const post = this.postsRepository.create({
            ...createPostDto,
            createdAt: new Date(),
        });

        return this.postsRepository.save(post);
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findPost(id);

        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        await this.postsRepository.update(id, updatePostDto);

        return post;
    }

    async findPostLikes(id: string): Promise<PostLikeEntity[]> {
        const postLike = await this.postLikesRepository.find({
            where: { post: { id } },
            relations: ['user'],
        });

        if (!postLike) {
            throw new NotFoundException(`Like with ID "${id}" not found`);
        }

        return postLike;
    }

}
