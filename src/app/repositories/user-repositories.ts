import { User } from '@app/entities/User';
import { User as RawUser } from '@prisma/client';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findAll(): Promise<RawUser[] | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
