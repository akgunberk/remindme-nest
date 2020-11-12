import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from '../schema/subscription.schema';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Push } from 'src/schema/push.schema';
import { Task } from 'src/schema/task.schema';

@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {

        const createdSubscription = new this.subscriptionModel(createSubscriptionDto)
            .populate(Push.name)
            .populate(Task.name);

        return createdSubscription.save();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Subscription> {
        const createdTask = new this.subscriptionModel(createTaskDto);
        return createdTask.save();
    }
    async createPush(createPushDto: CreateSubscriptionDto): Promise<Subscription> {
        const createdSubscription = new this.subscriptionModel(createPushDto);
        return createdSubscription.save();
    }

    async findAll(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }

    async findById(id: string): Promise<Subscription[]> {
        return this.subscriptionModel.find({ _id: id }).exec();
    }
}

