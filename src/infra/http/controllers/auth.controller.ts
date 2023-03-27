import { AuthenticationUser } from '@app/use-cases/authentication/authentication-user';
import { RefreshTokenUser } from '@app/use-cases/authentication/refresh-token-user';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserBody } from '../dtos/auth-user-body';
import { RefreshTokenBody } from './../dtos/refresh-token-body';

@Controller('auth')
export class AuthController {
  constructor(
    private authenticationUser: AuthenticationUser,
    private refreshTokenUser: RefreshTokenUser,
  ) {}

  @Post()
  async login(@Body() { email, password }: AuthUserBody) {
    const { token, refreshToken } = await this.authenticationUser.execute({
      email,
      password,
    });

    return {
      token,
      refreshToken: {
        id: refreshToken.id,
        userId: refreshToken.userId,
        expiresIn: refreshToken.expiresIn,
      },
    };
  }

  @Post('/refreshToken')
  async refreshToken(@Body() { refresh_token }: RefreshTokenBody) {
    const { newRefreshToken, token } = await this.refreshTokenUser.execute({
      tokenId: refresh_token,
    });

    if (newRefreshToken) {
      return {
        token,
        newRefreshToken,
      };
    }

    return {
      token,
    };
  }
}
