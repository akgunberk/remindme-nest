export class CreatePushDto {
    endpoint: string;
    timeZone: string;
    keys: {
        auth: string;
        p256hd: string;
    }
}