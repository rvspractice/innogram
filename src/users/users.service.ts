import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppErrorCode } from '../shared/error-codes.enums';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(PostCommentEntity)
        private postCommentsRepository: Repository<PostCommentEntity>,
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(AppErrorCode.USER_NOT_FOUND);
        }

        return user;
    }

    async removeUser(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.usersRepository.create({
            ...createUserDto
        });

        return this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findUserById(id);

        if (!user) {
            throw new NotFoundException(AppErrorCode.USER_NOT_FOUND);
        }

        await this.usersRepository.update(id, updateUserDto);

        const updatedUser = await this.findUserById(id);

        return updatedUser;
    }

    async findUserPosts(id: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['posts'],
        });

        if (!user) {
            throw new NotFoundException(AppErrorCode.USER_NOT_FOUND);
        }

        return user;
    }

    async findSubscribers(id: string): Promise<UserEntity[]> {
        return await this.usersRepository.find({
            where: { id },
            relations: ['subscriber'],
        });
    }

    async findSubscriptions(id: string): Promise<UserEntity[]> {
        return await this.usersRepository.find({
            where: { id },
            relations: ['targetUser'],
        });
    }

    async findPostLikes(id: string): Promise<UserEntity[]> {
        return await this.usersRepository.find({
            where: { id },
            relations: ['likes'],
        });
    }

    async findPostComments(id: string): Promise<PostCommentEntity[]> {
        const postComment = this.postCommentsRepository.find({
            where: { user: { id } },
            relations: ['post'],
        });

        if (!postComment) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }

        return postComment;
    }
}
