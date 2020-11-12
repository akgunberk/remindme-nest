import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from '../schema/subscription.schema';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Push, PushDocument } from 'src/schema/push.schema';
import { Task, TaskDocument } from 'src/schema/task.schema';
import { CreatePushDto } from 'src/dto/create-push-dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
        @InjectModel(Push.name) private pushModel: Model<PushDocument>
    ) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {

        const createdPush = await this.pushModel.create(createSubscriptionDto.subscription);


        return await this.subscriptionModel.create(
            {
                timeZone: createSubscriptionDto.timeZone,
                subscription: createdPush._id,
                tasks: []
            })

    }

    async findAll(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }

    async findById(id: string): Promise<Subscription[]> {
        return this.subscriptionModel.find({ _id: id }).exec();
    }
}

