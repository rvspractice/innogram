import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findAllSubscriptions(): Promise<Subscription[]> {
        return this.subscriptionsRepository.find();
    }

    findSubscription(id: string): Promise<Subscription | null> {
        return this.subscriptionsRepository.findOneBy({ id });
    }

    async removeSubscription(id: string): Promise<void> {
        await this.subscriptionsRepository.delete(id);
    }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        if (createSubscriptionDto.subscriberId === createSubscriptionDto.targetUserId) {
            throw new Error('You can not subscribe to yourself');
        }

        const subscriber = await this.userRepository.findOneBy({ id: createSubscriptionDto.subscriberId });
        const targetUser = await this.userRepository.findOneBy({ id: createSubscriptionDto.targetUserId });

        if (!subscriber || !targetUser) {
            throw new NotFoundException('User not found');
        }

        const subscription = new Subscription();
        subscription.subscriber = subscriber;
        subscription.targetUser = targetUser;
        subscription.createdAt = new Date();

        return this.subscriptionsRepository.save(subscription);
    }

    async updateSubscription(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
        const subscription = await this.findSubscription(id);

        if (!subscription) {
            throw new Error(`Subscription with id ${id} not found`);
        }

        const { subscriberId, targetUserId } = updateSubscriptionDto;
        const subscriber = await this.userRepository.findOneBy({ id: subscriberId });
        const targetUser = await this.userRepository.findOneBy({ id: targetUserId });

        if (!subscriber || !targetUser) {
            throw new NotFoundException('User not found');
        }

        await this.subscriptionsRepository.update(id, updateSubscriptionDto);

        return subscription;
    }

}
