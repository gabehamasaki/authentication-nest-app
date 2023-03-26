import { User } from '@app/entities/User';
import { UserRepository } from '@app/repositories/user-repositories';
import { Injectable } from '@nestjs/common';
import { User as RawUser } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from './../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });
  }

  async findAll(): Promise<RawUser[] | null> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!rawUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(rawUser);
  }

  async findById(userId: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!rawUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: PrismaUserMapper.toPrisma(user),
    });
  }
}
