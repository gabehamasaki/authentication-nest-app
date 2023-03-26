import { CreateUser } from '@app/use-cases/create-user';
import { ListUsers } from '@app/use-cases/list-users';
import { UpdateUser } from '@app/use-cases/update-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController],
  providers: [ListUsers, CreateUser, UpdateUser],
})
export class HttpModule {}
