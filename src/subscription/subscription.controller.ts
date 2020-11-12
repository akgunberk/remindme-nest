import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from 'src/dto/create-subscription.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionService: SubscriptionService) { }
    @Get()
    GetAllSubscriptions() {
        return this.subscriptionService.findAll();
    }

    @Get(':id')
    GetSubscriptionById(@Param() id: string) {
        return this.subscriptionService.findById(id);
    }

    @Post('create')
    CreateSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionService.createSubscription(createSubscriptionDto);
    }

    @Post(':id/task')
    CreateTask(@Body() createTaskDto: CreateTaskDto) {
        return this.subscriptionService.createTask(createTaskDto);
    }
}
