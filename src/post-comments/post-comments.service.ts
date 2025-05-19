import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { AppErrorCode } from '../shared/error-codes.enums';
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

    async findPostComment(id: string): Promise<PostCommentEntity> {
        const comment = await this.postCommentsRepository.findOne({ where: { id }, relations: ['user', 'post'] });
        if (!comment) {
            throw new NotFoundException(AppErrorCode.COMMENT_NOT_FOUND);
        }

        return comment;
    }

    async removePostComment(id: string): Promise<void> {
        await this.postCommentsRepository.delete(id);
    }

    async createPostComment(createPostCommentDto: any): Promise<PostCommentEntity> {
        const { userId, postId, content } = createPostCommentDto;

        const [creator, post] = await Promise.all([
            this.userRepository.findOneBy({ id: userId }),
            this.postsRepository.findOneBy({ id: postId }),
        ]);

        if (!creator) {
            throw new NotFoundException(AppErrorCode.USER_NOT_FOUND);
        }

        if (!post) {
            throw new NotFoundException(AppErrorCode.POST_NOT_FOUND);
        }

        const newComment = this.postCommentsRepository.create({
            content,
            user: creator,
            post: post,
        });

        return this.postCommentsRepository.save(newComment);
    }









}
