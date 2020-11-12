import { SubscriptionService } from './subscription.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from '../schema/subscription.schema';
import { SubscriptionsController } from './subscription.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionService],
    exports: [SubscriptionService]
})
export class SubscriptionModule { }
