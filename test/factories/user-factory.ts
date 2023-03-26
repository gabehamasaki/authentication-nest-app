import { User, UserProps } from '@app/entities/User';

type override = Partial<UserProps>;

export function makeUser(override?: override) {
  return new User({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '123456',
    ...override,
  });
}
