import { InMemoryTokenRepository } from '@test/in-memory/in-memory-token-repository';
import { RefreshTokenNotFound } from './../errors/refresh-token-not-found';
import { CreateRefreshToken } from './create-refresh-token';
import { DeleteRefreshToken } from './delete-refresh-token';
import { RefreshTokenUser } from './refresh-token-user';

describe('Refresh user token', () => {
  it('should be able to refresh user token', async () => {
    const inMemoryTokenRepository = new InMemoryTokenRepository();

    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);
    const deleteRefreshToken = new DeleteRefreshToken(inMemoryTokenRepository);
    const refreshTokenUser = new RefreshTokenUser(
      inMemoryTokenRepository,
      createRefreshToken,
      deleteRefreshToken,
    );

    const { refreshToken } = await createRefreshToken.execute({
      userId: 'fake-user-id',
    });

    expect(
      refreshTokenUser.execute({
        tokenId: refreshToken.id,
      }),
    ).toBeTruthy();
  });

  it('should not be able to refresh user token if token not exist', async () => {
    const inMemoryTokenRepository = new InMemoryTokenRepository();

    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);
    const deleteRefreshToken = new DeleteRefreshToken(inMemoryTokenRepository);
    const refreshTokenUser = new RefreshTokenUser(
      inMemoryTokenRepository,
      createRefreshToken,
      deleteRefreshToken,
    );

    expect(
      refreshTokenUser.execute({
        tokenId: 'fake-token-id',
      }),
    ).rejects.toThrow(RefreshTokenNotFound);
  });
});
