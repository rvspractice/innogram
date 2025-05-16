import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private subscriptionsRepository: Repository<SubscriptionEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    findAllSubscriptions(): Promise<SubscriptionEntity[]> {
        return this.subscriptionsRepository.find();
    }

    async findSubscriptionBtId(id: string): Promise<SubscriptionEntity> {
        const subscription = await this.subscriptionsRepository.findOneBy({ id });

        if (!subscription) {
            throw new NotFoundException(`Subscription with ID "${id}" not found`);
        }

        return subscription;
    }

    async removeSubscription(id: string): Promise<void> {
        await this.subscriptionsRepository.delete(id);
    }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
        if (createSubscriptionDto.subscriberId === createSubscriptionDto.targetUserId) {
            throw new BadRequestException('You can not subscribe to yourself');
        }

        const [subscriber, targetUser] = await Promise.all([
            this.userRepository.findOneBy({ id: createSubscriptionDto.subscriberId }),
            this.userRepository.findOneBy({ id: createSubscriptionDto.targetUserId }),
        ]);

        if (!subscriber || !targetUser) {
            throw new NotFoundException('User not found');
        }

        const subscription = new SubscriptionEntity();
        subscription.subscriber = subscriber;
        subscription.targetUser = targetUser;

        return this.subscriptionsRepository.save(subscription);
    }

    async updateSubscription(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<SubscriptionEntity> {
        const subscription = await this.findSubscriptionBtId(id);

        if (!subscription) {
            throw new Error(`Subscription with id ${id} not found`);
        }

        const { subscriberId, targetUserId } = updateSubscriptionDto;
        const [subscriber, targetUser] = await Promise.all([
            this.userRepository.findOneBy({ id: subscriberId }),
            this.userRepository.findOneBy({ id: targetUserId }),
        ]);

        if (!subscriber || !targetUser) {
            throw new NotFoundException('User not found');
        }
        if (subscriberId === targetUserId) {
            throw new BadRequestException('You can not subscribe to yourself');
        }

        subscription.subscriber = subscriber;
        subscription.targetUser = targetUser;
        await this.subscriptionsRepository.update(id, subscription);

        const updatedSubscription = await this.findSubscriptionBtId(id);

        return updatedSubscription;
    }

}
