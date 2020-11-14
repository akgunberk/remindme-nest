import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from 'src/dto/create-subscription.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscribe')
export class SubscriptionsController {
    constructor(private readonly subscriptionService: SubscriptionService) { }
    @Get()
    GetAllSubscriptions() {
        return this.subscriptionService.findAll();
    }

    @Post()
    async CreateSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return await this.subscriptionService.createSubscription(createSubscriptionDto);
    }

    @Get(':id')
    async GetSubscriptionById(@Param() param: { id: string }) {
        return await this.subscriptionService.findById(param.id);
    }

    @Post(':id')
    CreateTask(@Body() createTaskDto: CreateTaskDto, @Param() param: { id: string }) {
        return this.subscriptionService.createTask(param.id, createTaskDto);
    }


}
