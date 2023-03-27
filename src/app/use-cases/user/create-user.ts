import { User } from '@app/entities/User';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from '../../repositories/user-repositories';
import { EmailAlreadyExists } from '../errors/email-already-exist';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, name, password } = request;

    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      email,
      name,
      password: passwordHash,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
