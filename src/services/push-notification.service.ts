import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Day } from 'src/constants';

@Injectable()
export class PushNotificationService {

    constructor(private scheduler: SchedulerRegistry) { }

    createNotification(name: string, frequency: string | CronExpression): void {
        this.isCron(frequency) ?
            this.scheduler.addCronJob(name, frequency) : null
    }

    stopNotification(name: string): void {
        this.scheduler.deleteCronJob(name);
    }

    everyDay(name: string, day: Day, hour: string, minute: string): void {
        this.scheduler.addCronJob(name, `${minute} ${hour} * * ${day}`);
    }

    isCron(cron: string): boolean {
        let expression: number[];
        cron.split(' ').map(el => expression.push(parseInt(el, 10)));
        return expression.length === 5 &&
            expression[0] < 60 && expression[0] >= 0 &&
            expression[1] < 24 && expression[1] >= 0 &&
            expression[2] < 32 && expression[2] >= 0 &&
            expression[3] < 13 && expression[3] >= 0 &&
            expression[4] < 7 && expression[4] >= 0
    }

}
