import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(SubscriptionEntity)
        private subscriptionsRepository: Repository<SubscriptionEntity>,
        @InjectRepository(PostLikeEntity)
        private postLikesRepository: Repository<PostLikeEntity>,
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

    async createUser(createUserDto: UserDto): Promise<UserEntity> {
        const user = this.usersRepository.create({
            ...createUserDto,
            createdAt: new Date(),
            isVerified: createUserDto.isVerified ?? true,
            isBlocked: createUserDto.isBlocked ?? false,
            avatarUrl: createUserDto.avatarUrl ?? 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg',
        });

        return this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UserDto): Promise<UserEntity> {
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
}
