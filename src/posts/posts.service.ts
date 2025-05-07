import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private usersRepository: Repository<Post>,
    ) { }

    findAllPosts(): Promise<Post[]> {
        return this.usersRepository.find();
    }

    findPost(id: string): Promise<Post | null> {
        return this.usersRepository.findOneBy({ id });
    }


    async removePost(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createPost(createPostDto: PostDto): Promise<Post> {
        const post = this.usersRepository.create({
            ...createPostDto,
            createdAt: new Date(),
        });

        return this.usersRepository.save(post);
    }

    async updatePost(id: string, updatePostDto: PostDto): Promise<Post> {
        const post = await this.findPost(id);

        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        await this.usersRepository.update(id, updatePostDto);

        return post;
    }

}
