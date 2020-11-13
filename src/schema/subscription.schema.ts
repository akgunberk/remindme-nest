import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Push } from './push.schema';
import { Task } from './task.schema';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
    @Prop({ required: true })
    timeZone: string;

    @Prop({ type: Types.ObjectId, ref: Push.name })
    Push: Push;

    @Prop({ type: Types.ObjectId, ref: Task.name })
    Task: Task[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);