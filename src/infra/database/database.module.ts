import { UserRepository } from '@app/repositories/user-repositories';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
