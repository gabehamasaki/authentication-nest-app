import { User } from './User';

describe('User Entity', () => {
  it('should be able create a user', () => {
    const user = new User({
      email: 'user@example.com',
      password: '123456',
      name: 'John Doe',
    });
    expect(user).toBeTruthy();
  });
});
