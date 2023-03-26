import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/in-memory/in-memory-user-repository';
import { CreateUser } from './../create-user';
import { EmailAlreadyExists } from './../errors/email-already-exist';
describe('Create user', () => {
  it('should be able create a user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(inMemoryUserRepository);

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    expect(inMemoryUserRepository.users[0]).toEqual(user);
  });

  it('should not be able create a user with email already exist', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(inMemoryUserRepository);

    await inMemoryUserRepository.create(
      makeUser({
        email: 'john.doe@gmail.com',
      }),
    );

    expect(() => {
      return createUser.execute({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '123456',
      });
    }).rejects.toThrow(EmailAlreadyExists);
  });
});
