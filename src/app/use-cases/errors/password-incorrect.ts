import { HttpException, HttpStatus } from '@nestjs/common';
export class PasswordIncorrect extends HttpException {
  constructor(message?: string) {
    super(message ? message : 'Password incorrect', HttpStatus.UNAUTHORIZED);
  }
}
