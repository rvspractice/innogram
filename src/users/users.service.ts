import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { PostLike } from 'src/post-likes/entities/post-like.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
        @InjectRepository(PostLike)
        private postLikesRepository: Repository<PostLike>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // **Когда нужно и когда не нужно использовать async/await?
    findUser(id: string | FindOperator<string> | undefined): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    //   async findOne(id: string | FindOperator<string> | undefined): Promise<User | null> {
    //     return await this.usersRepository.findOneBy({ id });
    //   }

    async removeUser(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createUser(createUserDto: UserDto): Promise<User> {
        const user = this.usersRepository.create({
            ...createUserDto,
            createdAt: new Date(),
            isVerified: createUserDto.isVerified ?? true,
            isBlocked: createUserDto.isBlocked ?? false,
            avatarUrl: createUserDto.avatarUrl ?? 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg',
        });

        return this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UserDto): Promise<User> {
        const user = await this.findUser(id);

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        await this.usersRepository.update(id, updateUserDto);

        return user;
    }

    async findUserPosts(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['posts'],
        });
    }

    async findSubscribers(id: string): Promise<User[] | null> {
        const subscriptions = await this.subscriptionsRepository.find({
            where: { targetUser: { id } },
            relations: ['subscriber'],
        });

        return subscriptions.map((subscription) => subscription.subscriber);
    }

    async findSubscriptions(id: string): Promise<User[] | null> {
        const subscriptions = await this.subscriptionsRepository.find({
            where: { subscriber: { id } },
            relations: ['targetUser'],
        });

        return subscriptions.map((subscription) => subscription.targetUser);
    }

    async findPostLikes(id: string): Promise<PostLike[] | null> {
        return this.postLikesRepository.find({
            where: { user: { id } },
            relations: ['post'],
        });
    }
}
