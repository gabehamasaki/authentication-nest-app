import { AuthenticationUser } from '@app/use-cases/authentication/authentication-user';
import { CreateRefreshToken } from '@app/use-cases/authentication/create-refresh-token';
import { DeleteRefreshToken } from '@app/use-cases/authentication/delete-refresh-token';
import { RefreshTokenUser } from '@app/use-cases/authentication/refresh-token-user';
import { CreateUser } from '@app/use-cases/user/create-user';
import { ListUsers } from '@app/use-cases/user/list-users';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController, AuthController],
  providers: [
    ListUsers,
    CreateUser,
    UpdateUser,
    AuthenticationUser,
    CreateRefreshToken,
    DeleteRefreshToken,
    RefreshTokenUser,
  ],
})
export class HttpModule {}
