import { User } from '@app/entities/User';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
