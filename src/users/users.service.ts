import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { PostLikeEntity } from '../post-likes/entities/post-like.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostCommentEntity } from '../post-comments/entities/post-comment.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(SubscriptionEntity)
        private subscriptionsRepository: Repository<SubscriptionEntity>,
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
        @InjectRepository(PostCommentEntity)
        private postCommentsRepository: Repository<PostCommentEntity>,
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findUser(id: string | FindOperator<string> | undefined): Promise<UserEntity | null> {
        const user = this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async removeUser(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.usersRepository.create({
            ...createUserDto,
            created_at: new Date(),
            isVerified: createUserDto.isVerified ?? true,
            isBlocked: createUserDto.isBlocked ?? false,
            avatarUrl: createUserDto.avatarUrl ?? 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg',
        });

        return this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findUser(id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        await this.usersRepository.update(id, updateUserDto);

        return user;
    }

    async findUserPosts(id: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['posts'],
        });
    }

    async findSubscribers(id: string): Promise<UserEntity[] | null> {
        const subscriptions = await this.subscriptionsRepository.find({
            where: { targetUser: { id } },
            relations: ['subscriber'],
        });

        return subscriptions.map((subscription) => subscription.subscriber);
    }

    async findSubscriptions(id: string): Promise<UserEntity[] | null> {
        const subscriptions = await this.subscriptionsRepository.find({
            where: { subscriber: { id } },
            relations: ['targetUser'],
        });

        return subscriptions.map((subscription) => subscription.targetUser);
    }

    async findPostLikes(id: string): Promise<PostLikeEntity[] | null> {
        return this.postLikesRepository.find({
            where: { user: { id } },
            relations: ['post'],
        });
    }

    async findPostComments(id: string): Promise<PostCommentEntity[]> {
        return this.postCommentsRepository.find({
            where: { user: { id } },
            relations: ['post'],
        });
    }
}
