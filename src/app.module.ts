import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionsController } from './subscription/subscription.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { PushNotificationService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useFindAndModify: false,
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    SubscriptionModule,
  ],
  controllers: [AppController, SubscriptionsController],
  providers: [PushNotificationService],
})
export class AppModule { }
