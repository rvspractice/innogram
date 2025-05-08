import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
    ) { }

    @Get()
    async getAllSubscriptions() {
        return this.subscriptionsService.findAllSubscriptions();
    }
    @Get(':id') 
    async getById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.subscriptionsService.findSubscription(id);
        } catch (err) {
            throw new NotFoundException('Subscription not found');
        }
    }

    @Post()
    async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionsService.createSubscription(createSubscriptionDto);
    }

    @Put(':id')
    async updateSubscription(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateSubscriptionDto: UpdateSubscriptionDto
    ) {
        return this.subscriptionsService.updateSubscription(id, updateSubscriptionDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        await this.subscriptionsService.removeSubscription(id);
        return { message: 'Subscription deleted successfully' };
    }
}
