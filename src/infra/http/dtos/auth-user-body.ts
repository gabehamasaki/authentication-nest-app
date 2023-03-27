import Regex from '@helpers/Regex';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class AuthUserBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  @Matches(Regex.passwordUpperCase, '', {
    message:
      'Password must be at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
