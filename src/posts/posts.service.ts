import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
    ) { }

    findAllPosts(): Promise<PostEntity[]> {
        return this.postsRepository.find();
    }

    findPost(id: string): Promise<PostEntity | null> {
        return this.postsRepository.findOneBy({ id });
    }


    async removePost(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async createPost(createPostDto: PostDto): Promise<PostEntity> {
        const post = this.postsRepository.create({
            ...createPostDto,
            createdAt: new Date(),
        });

        return this.postsRepository.save(post);
    }

    async updatePost(id: string, updatePostDto: PostDto): Promise<PostEntity> {
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

}
