import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';
import { GenerateToken } from '@helpers/generate-token';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import * as dayjs from 'dayjs';
import { RefreshTokenNotFound } from '../errors/refresh-token-not-found';
import { CreateRefreshToken } from './create-refresh-token';
import { DeleteRefreshToken } from './delete-refresh-token';

interface RefreshRefreshTokenRequest {
  tokenId: string;
}

interface RefreshRefreshTokenResponse {
  token: string;
  newRefreshToken?: RefreshToken;
}

@Injectable()
export class RefreshTokenUser {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private createRefreshToken: CreateRefreshToken,
    private deleteRefreshToken: DeleteRefreshToken,
  ) {}

  async execute({
    tokenId,
  }: RefreshRefreshTokenRequest): Promise<RefreshRefreshTokenResponse> {
    const refreshToken = await this.refreshTokenRepository.findById(tokenId);

    if (!refreshToken) {
      throw new RefreshTokenNotFound();
    }

    const { token } = await GenerateToken.execute({
      userId: refreshToken.userId,
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    if (refreshTokenExpired) {
      await this.deleteRefreshToken.execute({ tokenId: refreshToken.id });

      const { refreshToken: newRefreshToken } =
        await this.createRefreshToken.execute({
          userId: refreshToken.userId,
        });

      return {
        token,
        newRefreshToken: {
          id: newRefreshToken.id,
          expiresIn: newRefreshToken.expiresIn,
          userId: newRefreshToken.userId,
        },
      };
    }

    return {
      token,
    };
  }
}
