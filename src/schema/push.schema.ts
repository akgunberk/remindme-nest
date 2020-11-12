import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PushDocument = Push & Document;

@Schema()
export class Push {
    @Prop({ required: true, unique: true })
    endpoint: string;

    @Prop({ required: true })
    expirationTime: number;

    @Prop(raw({
        auth: { type: String, required: true },
        p256dh: { type: String, required: true }
    }))
    keys: { auth: string, p256dh: string };
}

export const PushSchema = SchemaFactory.createForClass(Push);