import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { PostCommentEntity } from './entities/post-comment.entity';

@Injectable()
export class PostCommentsService {
    constructor(
        @InjectRepository(PostCommentEntity)
        private postCommentsRepository: Repository<PostCommentEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
    ) { }

    async findAllPostComments(): Promise<PostCommentEntity[]> {
        return this.postCommentsRepository.find({ relations: ['user', 'post'] });
    }

    async findPostComment(id: string): Promise<PostCommentEntity | null> {
        return this.postCommentsRepository.findOne({ where: { id }, relations: ['user', 'post'] });
    }

    async removePostComment(id: string): Promise<void> {
        await this.postCommentsRepository.delete(id);
    }

    async createPostComment(createPostCommentDto: any): Promise<PostCommentEntity> {
        const [creator, post] = await Promise.all([
            this.userRepository.findOneBy({ id: createPostCommentDto.userId }),
            this.postsRepository.findOneBy({ id: createPostCommentDto.postId }),
        ]);

        if (!creator) {
            throw new NotFoundException(`User with id ${createPostCommentDto.userId} not found`);
        }

        if (!post) {
            throw new NotFoundException(`Post with id ${createPostCommentDto.postId} not found`);
        }

        const postComment = new PostCommentEntity();
        postComment.user = creator;
        postComment.post = post;
        postComment.content = createPostCommentDto.content;
        postComment.created_at = new Date();

        return this.postCommentsRepository.save(postComment);
    }









}
