import { Injectable } from '@nestjs/common';
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

    findPost(id: string): Promise<PostEntity | null> {
        return this.postsRepository.findOneBy({ id });
    }


    async removePost(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
        const post = this.postsRepository.create({
            ...createPostDto,
            created_at: new Date(),
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

    async findPostLikes(id: string): Promise<PostLikeEntity[] | null> {
        return this.postLikesRepository.find({
            where: { post: { id } },
            relations: ['user'],
        });
    }

    async findPostComments(id: string): Promise<PostCommentEntity[]> {
        return this.postCommentsRepository.find({
            where: { post: { id } },
            relations: ['user'],
        });
    }

}
