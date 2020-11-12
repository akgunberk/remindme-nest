export class CreateSubscriptionDto {
    readonly subscription: {
        endpoint: string,
        timeZone: string,
        keys: {
            auth: string,
            p256hd: string,
        }
    }
    readonly timeZone: string
    readonly task: {
        payload: string,
        cron: string,
        active: boolean
    }[]
}