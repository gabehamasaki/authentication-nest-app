import { HttpException, HttpStatus } from '@nestjs/common';
export class RefreshTokenNotFound extends HttpException {
  constructor(message?: string) {
    super(message ? message : 'Refresh token not found', HttpStatus.NOT_FOUND);
  }
}
