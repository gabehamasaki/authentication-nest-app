import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Token } from '../../entities/Token';
interface CreateRefreshTokenRequest {
  userId: string;
}

interface CreateRefreshTokenResponse {
  refreshToken: Token;
}

@Injectable()
export class CreateRefreshToken {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}
  async execute({
    userId,
  }: CreateRefreshTokenRequest): Promise<CreateRefreshTokenResponse> {
    const expiresIn = dayjs().add(7, 'days').unix();

    const refreshToken = new Token({
      userId,
      expiresIn,
    });

    const alreadyExistToken = await this.refreshTokenRepository.findByUserId(
      userId,
    );

    if (alreadyExistToken) {
      return {
        refreshToken: alreadyExistToken,
      };
    }

    await this.refreshTokenRepository.create(refreshToken);

    return {
      refreshToken,
    };
  }
}
