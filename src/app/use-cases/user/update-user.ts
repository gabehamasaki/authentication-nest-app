import { User } from '@app/entities/User';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from '../../repositories/user-repositories';
import { EmailAlreadyExists } from '../errors/email-already-exist';
import { UserNotFound } from '../errors/user-not-found';

interface UpdateUserRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, email, name, password } = request;

    const user = await this.userRepository.findById(userId);
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    if (email) {
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordHash = await hash(password, 8);
      user.password = passwordHash;
    }

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
