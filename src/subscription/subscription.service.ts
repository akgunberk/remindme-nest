import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from '../schema/subscription.schema';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Push, PushDocument } from 'src/schema/push.schema';
import { Task, TaskDocument } from 'src/schema/task.schema';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
        @InjectModel(Push.name) private pushModel: Model<PushDocument>,
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {

        const createdPush = await this.pushModel.create(createSubscriptionDto.subscription);

        return await this.subscriptionModel.create(
            {
                timeZone: createSubscriptionDto.timeZone,
                Push: createdPush._id,
                Task: []
            })
    }

    async createTask(id: string, createTaskDto: CreateTaskDto): Promise<Subscription> {

        let { message, cron, active } = createTaskDto;
        const createdTask = await this.taskModel.create({ message, cron, active });

        return await this.subscriptionModel.
            findByIdAndUpdate(id, { $push: { Task: createdTask._id } }, { new: true })
            .populate(Push.name)
            .populate({
                path: 'Task',
                model: this.taskModel
            });
    }



    async findAll(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }

    async findById(id: string): Promise<Subscription> {
        return this.subscriptionModel.findById(id).populate(Push.name).exec();
    }
}

