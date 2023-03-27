import { Token } from '@app/entities/Token';
import { RefreshToken as RawToken } from '@prisma/client';

export class PrismaRefreshTokenMapper {
  static toPrisma(token: Token): RawToken {
    return {
      id: token.id,
      userId: token.userId,
      expiresIn: token.expiresIn,
    };
  }

  static toDomain(raw: RawToken): Token {
    return new Token(
      {
        userId: raw.userId,
        expiresIn: raw.expiresIn,
      },
      raw.id,
    );
  }
}
