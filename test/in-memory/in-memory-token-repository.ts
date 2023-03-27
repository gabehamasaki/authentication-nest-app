import { Token } from '@app/entities/Token';
import { RefreshTokenRepository } from '@app/repositories/refresh-token-repositories';

export class InMemoryTokenRepository implements RefreshTokenRepository {
  public tokens: Token[] = [];

  async create(token: Token): Promise<void> {
    this.tokens.push(token);
  }

  async delete(tokenId: string): Promise<void> {
    const index = this.tokens.findIndex((token) => token.id === tokenId);

    this.tokens.splice(index, 1);
  }

  async findById(tokenId: string): Promise<Token | null> {
    return this.tokens.find((token) => token.id === tokenId);
  }

  async findByUserId(userId: string): Promise<Token | null> {
    return this.tokens.find((token) => token.userId === userId);
  }
}
