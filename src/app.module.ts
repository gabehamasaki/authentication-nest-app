import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { MessagingModule } from '@infra/messaging/messaging.module';
import { AuthMiddleware } from '@infra/middleware/auth.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    DatabaseModule,
    MessagingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('app', 'users/:id', {
      method: RequestMethod.GET,
      path: '/users',
    });
  }
}
