import { CreateUser } from '@app/use-cases/user/create-user';
import { ListUsers } from '@app/use-cases/user/list-users';
import { UpdateUser } from '@app/use-cases/user/update-user';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserViewModel } from '../view-models/user-view-model';
import { CreateUserBody } from './../dtos/create-user-body';
import { UpdateUserBody } from './../dtos/update-user-body';

@Controller('users')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private listUsers: ListUsers,
    private updateUser: UpdateUser,
  ) {}

  @Get('/') async index() {
    const { users } = await this.listUsers.execute();
    return {
      users,
    };
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({
      email,
      password,
      name,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Patch('/:id')
  async update(@Param('id') userId: string, @Body() body: UpdateUserBody) {
    const { user } = await this.updateUser.execute({
      userId: userId,
      ...body,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
