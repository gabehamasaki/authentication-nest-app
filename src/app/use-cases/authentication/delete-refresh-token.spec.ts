import { InMemoryTokenRepository } from '@test/in-memory/in-memory-token-repository';
import { CreateRefreshToken } from './create-refresh-token';
import { DeleteRefreshToken } from './delete-refresh-token';

describe('Delete Refresh Token', () => {
  it('should be able delete a refresh token', async () => {
    const inMemoryTokenRepository = new InMemoryTokenRepository();
    const deleteRefreshToken = new DeleteRefreshToken(inMemoryTokenRepository);
    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);

    const { refreshToken } = await createRefreshToken.execute({
      userId: 'test-user-id',
    });

    await deleteRefreshToken.execute({ tokenId: refreshToken.id });

    expect(
      await inMemoryTokenRepository.findById(refreshToken.id),
    ).toBeUndefined();
  });
});
