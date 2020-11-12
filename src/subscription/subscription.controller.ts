import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from 'src/dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionService: SubscriptionService) { }
    @Get()
    GetSubscriptions() {
        return this.subscriptionService.findAll();
    }

    @Post()
    CreateSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionService.create(createSubscriptionDto);
    }
}
