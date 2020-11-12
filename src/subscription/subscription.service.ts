import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from '../schema/subscription.schema';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>) { }

    async create(createCatDto: CreateSubscriptionDto): Promise<Subscription> {
        const createdSubscription = new this.subscriptionModel(createCatDto);
        return createdSubscription.save();
    }

    async findAll(): Promise<Subscription[]> {
        return this.subscriptionModel.find().exec();
    }
}

