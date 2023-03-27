import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';
import { Injectable } from '@nestjs/common';
import { RefreshTokenNotFound } from './../errors/refresh-token-not-found';

interface DeleteRefreshTokenRequest {
  tokenId: string;
}

@Injectable()
export class DeleteRefreshToken {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}
  async execute({ tokenId }: DeleteRefreshTokenRequest): Promise<void> {
    const alreadyExistToken = await this.refreshTokenRepository.findById(
      tokenId,
    );

    if (!alreadyExistToken) {
      throw new RefreshTokenNotFound();
    }

    await this.refreshTokenRepository.delete(tokenId);
  }
}
