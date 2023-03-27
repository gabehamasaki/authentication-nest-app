import { Token } from '@app/entities/Token';
import { UserRepository } from '@app/repositories/user-repositories';
import { GenerateToken } from '@helpers/generate-token';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PasswordIncorrect } from './../errors/password-incorrect';
import { UserNotFound } from './../errors/user-not-found';
import { CreateRefreshToken } from './create-refresh-token';

interface AuthenticationUserRequest {
  email: string;
  password: string;
}

interface AuthenticationUserResponse {
  token: string;
  refreshToken: Token;
}

@Injectable()
export class AuthenticationUser {
  constructor(
    private userRepository: UserRepository,
    private createRefreshToken: CreateRefreshToken,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticationUserRequest): Promise<AuthenticationUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound('User or password incorrect');
    }

    const passwordHash = await compare(password, user.password);

    if (!passwordHash) {
      throw new PasswordIncorrect('User or password incorrect');
    }

    const { token } = await GenerateToken.execute({ userId: user.id });

    const { refreshToken } = await this.createRefreshToken.execute({
      userId: user.id,
    });

    return {
      token,
      refreshToken,
    };
  }
}
