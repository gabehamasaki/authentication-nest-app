import { HttpException, HttpStatus } from '@nestjs/common';
export class UserNotFound extends HttpException {
  constructor(message?: string) {
    super(message ? message : 'User not found', HttpStatus.NOT_FOUND);
  }
}
