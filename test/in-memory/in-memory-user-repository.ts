import { User } from '@app/entities/User';
import { UserRepository } from '@app/repositories/user-repositories';
export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }

  async findById(userId: string): Promise<User> {
    return this.users.find((user) => user.id === userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
