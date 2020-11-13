import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    message: string;

    @Prop()
    cron: string;

    @Prop()
    active: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);