import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/in-memory/in-memory-user-repository';
import { ListUsers } from './list-users';
describe('List users', () => {
  it('should be able create a user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const listUsers = new ListUsers(inMemoryUserRepository);

    inMemoryUserRepository.create(makeUser());
    inMemoryUserRepository.create(makeUser());
    inMemoryUserRepository.create(makeUser());

    const { users } = await listUsers.execute();

    expect(users).toEqual(inMemoryUserRepository.users);
  });
});
