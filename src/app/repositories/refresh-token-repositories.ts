import { Token } from './../entities/Token';
export abstract class RefreshTokenRepository {
  abstract create(token: Token): Promise<void>;
  abstract delete(tokenId: string): Promise<void>;
  abstract findById(tokenId: string): Promise<Token | null>;
  abstract findByUserId(userId: string): Promise<Token | null>;
}
