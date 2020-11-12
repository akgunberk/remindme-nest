export class CreatePushDto {
    endpoint: string;
    expirationTime: string;
    keys: {
        auth: string;
        p256dh: string;
    }
}