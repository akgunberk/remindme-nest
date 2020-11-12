import { CreateTaskDto } from "./create-task.dto"

export class CreateSubscriptionDto {
    readonly subscription: CreateSubscriptionDto
    readonly timeZone: string
    readonly task: CreateTaskDto[]
}