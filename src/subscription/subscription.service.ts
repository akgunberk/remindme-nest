import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PushNotificationService } from 'src/services';
import { Subscription, SubscriptionDocument, Push, PushDocument, Task, TaskDocument } from 'src/schema';
import { CreateSubscriptionDto, CreateTaskDto } from 'src/dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
        @InjectModel(Push.name) private PushModel: Model<PushDocument>,
        @InjectModel(Task.name) private TaskModel: Model<TaskDocument>,
        private pushService: PushNotificationService,
    ) { }

    async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
        const createdPush = await this.PushModel.create(createSubscriptionDto.subscription);
        return await this.subscriptionModel.create(
            {
                timeZone: createSubscriptionDto.timeZone,
                Push: createdPush._id,
                Task: []
            })
    }

    async createTask(id: string, createTaskDto: CreateTaskDto): Promise<Subscription> {
        let { message, cron } = createTaskDto;
        const createdTask = await this.TaskModel.create({ message, cron });
        this.pushService.createNotification(createdTask._id, cron);
        return await this.subscriptionModel.
            findByIdAndUpdate(id, { $push: { Task: createdTask._id } }, { new: true })
            .populate(Push.name)
            .populate({
                path: 'Task',
                model: this.TaskModel
            });
    }


    async stopTask(id: string) {
        this.pushService.stopNotification(id);
    }

    async findAll(): Promise<Subscription[]> {
        return this.subscriptionModel
            .find()
            .lean()
            .exec();
    }

    async findById(id: string): Promise<Subscription> {
        return this.subscriptionModel
            .findById(id)
            .populate(Push.name)
            .populate({
                path: 'Task',
                model: this.TaskModel
            }).exec();
    }
}

