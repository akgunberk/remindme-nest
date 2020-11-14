import { SubscriptionService } from './subscription.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from '../schema/subscription.schema';
import { SubscriptionsController } from './subscription.controller';
import { Push, PushSchema } from 'src/schema/push.schema';
import { Task, TaskSchema } from 'src/schema/task.schema';
import { PushNotificationService } from 'src/services';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Subscription.name, schema: SubscriptionSchema },
        { name: Push.name, schema: PushSchema },
        { name: Task.name, schema: TaskSchema },
    ])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionService, PushNotificationService],
    exports: [SubscriptionService]
})
export class SubscriptionModule { }
