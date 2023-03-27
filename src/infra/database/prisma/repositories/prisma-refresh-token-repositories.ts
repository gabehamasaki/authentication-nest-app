import { Token } from '@app/entities/Token';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';
import { Injectable } from '@nestjs/common';
import { PrismaRefreshTokenMapper } from './../mappers/prisma-refresh-token-mapper';
import { PrismaService } from './../prisma.service';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private prisma: PrismaService) {}

  async create(token: Token): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: token.id,
        expiresIn: token.expiresIn,
        userId: token.userId,
      },
    });
  }
  async delete(tokenId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        id: tokenId,
      },
    });
  }
  async findById(tokenId: string): Promise<Token | null> {
    const tokenRaw = await this.prisma.refreshToken.findFirst({
      where: {
        id: tokenId,
      },
    });

    if (!tokenRaw) {
      return null;
    }

    return PrismaRefreshTokenMapper.toDomain(tokenRaw);
  }
  async findByUserId(userId: string): Promise<Token | null> {
    const tokenRaw = await this.prisma.refreshToken.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!tokenRaw) {
      return null;
    }

    return PrismaRefreshTokenMapper.toDomain(tokenRaw);
  }
}
