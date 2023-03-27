import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/in-memory/in-memory-user-repository';
import { EmailAlreadyExists } from '../errors/email-already-exist';
import { UserNotFound } from '../errors/user-not-found';
import { UpdateUser } from './update-user';
describe('Update user', () => {
  it('should be able update a user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(inMemoryUserRepository);

    const user = makeUser();

    await inMemoryUserRepository.create(user);

    await updateUser.execute({
      userId: user.id,
      email: 'john@doe.com',
    });

    expect(inMemoryUserRepository.users[0].email).toEqual('john@doe.com');
  });

  it('should not be able update a user is the user not existing', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(inMemoryUserRepository);

    expect(() => {
      return updateUser.execute({
        userId: 'fake-user-id',
        email: 'john@doe.com',
      });
    }).rejects.toThrow(UserNotFound);
  });

  it('should not be able update a user with email already exist', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(inMemoryUserRepository);

    const user = makeUser();

    await inMemoryUserRepository.create(makeUser());
    await inMemoryUserRepository.create(user);

    expect(() => {
      return updateUser.execute({
        userId: user.id,
        email: 'john.doe@gmail.com',
      });
    }).rejects.toThrow(EmailAlreadyExists);
  });
});
