import Regex from '@helpers/Regex';
import { IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class UpdateUserBody {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8, 255)
  @Matches(Regex.passwordUpperCase, '', {
    message:
      'Password must be at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsOptional()
  name: string;
}
