import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { PostLike } from 'src/post-likes/entities/post-like.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        @InjectRepository(PostLike)
        private postLikesRepository: Repository<PostLike>,
    ) { }

    findAllPosts(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    findPost(id: string): Promise<Post | null> {
        return this.postsRepository.findOneBy({ id });
    }


    async removePost(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async createPost(createPostDto: PostDto): Promise<Post> {
        const post = this.postsRepository.create({
            ...createPostDto,
            createdAt: new Date(),
        });

        return this.postsRepository.save(post);
    }

    async updatePost(id: string, updatePostDto: PostDto): Promise<Post> {
        const post = await this.findPost(id);

        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        await this.postsRepository.update(id, updatePostDto);

        return post;
    }

    async findPostLikes(id: string): Promise<PostLike[] | null> {
        return this.postLikesRepository.find({
            where: { post: { id } },
            relations: ['user'],
        });
    }

}
