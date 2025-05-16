import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostLikeEntity } from '../post-likes/entities/post-like.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';
import { PaginationDto } from 'src/shared/pagination.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
        @InjectRepository(PostCommentEntity)
        private postCommentsRepository: Repository<PostCommentEntity>,
    ) { }

    async findAllPosts(paginationDto: PaginationDto): Promise<{ data: PostEntity[]; count: number }> {
        const { limit = 10, offset = 0 } = paginationDto;

        const [products, total] = await this.postsRepository.findAndCount({
            take: limit,
            skip: offset,
        });

        return {
            data: products,
            count: total,
        };
    }

    async findPostById(id: string): Promise<PostEntity> {
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
        });

        return this.postsRepository.save(post);
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findPostById(id);

        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        await this.postsRepository.update(id, updatePostDto);

        const updatedPost = await this.findPostById(id);

        return updatedPost;
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

    async findPostComments(id: string): Promise<PostCommentEntity[]> {
        const postLike = this.postCommentsRepository.find({
            where: { post: { id } },
            relations: ['user'],
        });

        if (!postLike) {
            throw new NotFoundException(`Like with ID "${id}" not found`);
        }

        return postLike;
    }

}
