import { makeUser } from '@test/factories/user-factory';
import { InMemoryTokenRepository } from '@test/in-memory/in-memory-token-repository';
import { InMemoryUserRepository } from '@test/in-memory/in-memory-user-repository';
import { verify } from 'jsonwebtoken';
import { CreateUser } from '../user/create-user';
import { PasswordIncorrect } from './../errors/password-incorrect';
import { UserNotFound } from './../errors/user-not-found';
import { AuthenticationUser } from './authentication-user';
import { CreateRefreshToken } from './create-refresh-token';

describe('Authentication User', () => {
  it('should be able to authenticate user if email already exists', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryTokenRepository = new InMemoryTokenRepository();

    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);
    const authenticationUser = new AuthenticationUser(
      inMemoryUserRepository,
      createRefreshToken,
    );
    const createUser = new CreateUser(inMemoryUserRepository);

    const { user } = await createUser.execute(
      makeUser({
        password: '123456',
      }),
    );

    const { token, refreshToken } = await authenticationUser.execute({
      email: user.email,
      password: '123456',
    });

    expect(verify(token, process.env.PRIVATE_KEY)).toBeTruthy();
    expect(
      await inMemoryTokenRepository.findById(refreshToken.id),
    ).toBeTruthy();
  });

  it('should not be able to authenticate user if email not exists', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryTokenRepository = new InMemoryTokenRepository();

    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);
    const authenticationUser = new AuthenticationUser(
      inMemoryUserRepository,
      createRefreshToken,
    );
    const createUser = new CreateUser(inMemoryUserRepository);

    await createUser.execute(
      makeUser({
        password: '123456',
      }),
    );

    expect(
      authenticationUser.execute({
        email: 'email@example.com',
        password: '123456',
      }),
    ).rejects.toThrow(UserNotFound);
  });

  it('should not be able to authenticate user if wrong password', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryTokenRepository = new InMemoryTokenRepository();

    const createRefreshToken = new CreateRefreshToken(inMemoryTokenRepository);
    const authenticationUser = new AuthenticationUser(
      inMemoryUserRepository,
      createRefreshToken,
    );
    const createUser = new CreateUser(inMemoryUserRepository);

    const { user } = await createUser.execute(
      makeUser({
        password: '123456',
      }),
    );

    expect(
      authenticationUser.execute({
        email: user.email,
        password: '12345',
      }),
    ).rejects.toThrow(PasswordIncorrect);
  });
});
