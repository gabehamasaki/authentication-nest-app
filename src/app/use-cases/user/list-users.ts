import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user-repositories';

interface ListUsersResponse {
  users: User[];
}

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.userRepository.findAll();

    return {
      users,
    };
  }
}
