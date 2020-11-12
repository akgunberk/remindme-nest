export class CreateTaskDto {
    readonly payload: string
    readonly cron: string
    readonly active: boolean
}