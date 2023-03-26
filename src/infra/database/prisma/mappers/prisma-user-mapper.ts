import { User } from '@app/entities/User';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      raw.id,
    );
  }
}
