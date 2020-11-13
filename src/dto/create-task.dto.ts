export class CreateTaskDto {
    readonly message: string
    readonly cron: string
    readonly active: boolean
}