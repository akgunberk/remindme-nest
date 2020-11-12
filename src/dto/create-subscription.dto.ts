import { CreatePushDto } from "./create-push-dto"
import { CreateTaskDto } from "./create-task.dto"

export class CreateSubscriptionDto {
    readonly subscription: CreatePushDto
    readonly timeZone: string
    readonly tasks: CreateTaskDto
}