import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';
import { UserRepository } from '@app/repositories/user-repositories';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaRefreshTokenRepository } from './prisma/repositories/prisma-refresh-token-repositories';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: RefreshTokenRepository,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  exports: [UserRepository, RefreshTokenRepository],
})
export class DatabaseModule {}
