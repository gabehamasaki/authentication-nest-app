import { InMemoryTokenRepository } from '@test/in-memory/in-memory-token-repository';
import { CreateRefreshToken } from './create-refresh-token';

describe('Create Refresh Token', () => {
  it('should be able create a refresh token', async () => {
    const inMemoryTokenRepository = new InMemoryTokenRepository();
    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);

    expect(
      await createRefreshToken.execute({
        userId: 'user-id',
      }),
    ).toBeTruthy();
  });
});
